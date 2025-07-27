import { FirebaseService } from '../services/firebase.ts';
import { parseYamlToBookData } from '../utils/yamlParser.ts';
import fs from 'fs';
import path from 'path';

async function updateCrimeAndPunishmentOnly() {
  try {
    console.log('Uploading Crime and Punishment data from YAML to Firebase...');
    
    // Read the YAML file
    const yamlPath = path.join(process.cwd(), 'crime-and-punishment-bookvis.yaml');
    const yamlContent = fs.readFileSync(yamlPath, 'utf8');
    
    // Parse YAML to BookData
    const crimeAndPunishmentData = parseYamlToBookData(yamlContent);
    
    // Upload to Firebase
    await FirebaseService.saveBook(crimeAndPunishmentData);
    console.log('Crime and Punishment data uploaded successfully!');
  } catch (error) {
    console.error('Failed to upload Crime and Punishment data:', error);
  }
}

updateCrimeAndPunishmentOnly(); 