#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Kotlin to TypeScript type mapping
const typeMapping = {
  'String': 'string',
  'Int': 'number',
  'Double': 'number',
  'Float': 'number',
  'Boolean': 'boolean',
  'List<String>': 'string[]',
  'List<Int>': 'number[]',
  'List<Double>': 'number[]',
  'List<Float>': 'number[]',
  'List<Boolean>': 'boolean[]',
};

// Known model types for proper imports
const modelTypes = ['Author', 'Book', 'Chapter', 'Character', 'Faction', 'Relationship', 'BookData'];

function convertKotlinTypeToTypeScript(kotlinType) {
  // Handle List types
  if (kotlinType.startsWith('List<') && kotlinType.endsWith('>')) {
    const innerType = kotlinType.slice(5, -1);
    if (modelTypes.includes(innerType)) {
      return `${innerType}[]`;
    }
    return `${convertKotlinTypeToTypeScript(innerType)}[]`;
  }
  
  // Handle direct model types
  if (modelTypes.includes(kotlinType)) {
    return kotlinType;
  }
  
  // Handle primitive types
  return typeMapping[kotlinType] || 'any';
}

function extractImports(properties) {
  const imports = new Set();
  
  for (const prop of properties) {
    const tsType = convertKotlinTypeToTypeScript(prop.type);
    if (modelTypes.includes(tsType.replace('[]', ''))) {
      imports.add(tsType.replace('[]', ''));
    }
  }
  
  return Array.from(imports);
}

function parseKotlinDataClass(content) {
  const lines = content.split('\n');
  const properties = [];
  let inDataClass = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed.startsWith('data class')) {
      inDataClass = true;
      continue;
    }
    
    if (inDataClass && trimmed.startsWith('val ')) {
      const match = trimmed.match(/val (\w+): (\w+(?:<[^>]+>)?)/);
      if (match) {
        properties.push({
          name: match[1],
          type: match[2]
        });
      }
    }
    
    if (inDataClass && trimmed === '}') {
      break;
    }
  }
  
  return properties;
}

function generateTypeScriptInterface(className, properties) {
  const imports = extractImports(properties);
  
  let content = '';
  
  if (imports.length > 0) {
    content += `import type { ${imports.join(', ')} } from './${imports[0]}';\n\n`;
  }
  
  content += `export interface ${className} {\n`;
  
  for (const prop of properties) {
    const tsType = convertKotlinTypeToTypeScript(prop.type);
    content += `  ${prop.name}: ${tsType};\n`;
  }
  
  content += '}\n';
  
  return content;
}

function updateFrontendModels() {
  const backendModelsDir = path.join(__dirname, '..', 'src', 'main', 'kotlin', 'bookvis', 'models');
  const frontendModelsDir = path.join(__dirname, '..', 'ui', 'src', 'models');
  
  // Ensure frontend models directory exists
  if (!fs.existsSync(frontendModelsDir)) {
    fs.mkdirSync(frontendModelsDir, { recursive: true });
  }
  
  // Read all Kotlin model files
  const kotlinFiles = fs.readdirSync(backendModelsDir)
    .filter(file => file.endsWith('.kt'))
    .map(file => file.replace('.kt', ''));
  
  console.log('Updating frontend models...');
  
  for (const modelName of kotlinFiles) {
    const kotlinFilePath = path.join(backendModelsDir, `${modelName}.kt`);
    const typescriptFilePath = path.join(frontendModelsDir, `${modelName}.ts`);
    
    try {
      const kotlinContent = fs.readFileSync(kotlinFilePath, 'utf8');
      const properties = parseKotlinDataClass(kotlinContent);
      
      if (properties.length > 0) {
        const typescriptContent = generateTypeScriptInterface(modelName, properties);
        fs.writeFileSync(typescriptFilePath, typescriptContent);
        console.log(`✓ Updated ${modelName}.ts`);
      } else {
        console.log(`⚠ Could not parse properties for ${modelName}.kt`);
      }
    } catch (error) {
      console.error(`✗ Error processing ${modelName}.kt:`, error.message);
    }
  }
  
  console.log('Frontend models updated successfully!');
}

// Run the script
updateFrontendModels(); 