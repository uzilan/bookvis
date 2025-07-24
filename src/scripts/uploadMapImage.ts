import FirebaseService from '../services/firebase';

async function uploadMapImage() {
  try {
    console.log('Uploading Underland map image to Firebase Storage...');
    
    // For now, let's create a simple SVG map and upload it
    const svgContent = `
      <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#87CEEB"/>
        <circle cx="100" cy="80" r="20" fill="#FFB6C1" stroke="#FF69B4" stroke-width="2"/>
        <text x="100" y="85" text-anchor="middle" font-size="8" fill="#8B0000">Queen's Garden</text>
        <circle cx="300" cy="120" r="25" fill="#98FB98" stroke="#32CD32" stroke-width="2"/>
        <text x="300" y="125" text-anchor="middle" font-size="8" fill="#006400">Tulgey Wood</text>
        <circle cx="200" cy="200" r="30" fill="#F0E68C" stroke="#DAA520" stroke-width="2"/>
        <text x="200" y="205" text-anchor="middle" font-size="8" fill="#8B4513">Tea Party</text>
        <circle cx="80" cy="220" r="18" fill="#E6E6FA" stroke="#9370DB" stroke-width="2"/>
        <text x="80" y="225" text-anchor="middle" font-size="8" fill="#4B0082">Rabbit Hole</text>
        <circle cx="320" cy="60" r="22" fill="#FFE4E1" stroke="#FF6347" stroke-width="2"/>
        <text x="320" y="65" text-anchor="middle" font-size="8" fill="#8B0000">Cheshire Cat</text>
        <path d="M 100 80 Q 150 100 200 200" stroke="#8B4513" stroke-width="2" fill="none"/>
        <path d="M 200 200 Q 250 150 300 120" stroke="#8B4513" stroke-width="2" fill="none"/>
        <path d="M 80 220 Q 120 180 100 80" stroke="#8B4513" stroke-width="2" fill="none"/>
        <text x="200" y="280" text-anchor="middle" font-size="12" fill="#000080" font-weight="bold">Wonderland Map</text>
      </svg>
    `;
    
    // Convert SVG to Blob
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const file = new File([blob], 'wonderland-map.svg', { type: 'image/svg+xml' });
    
    // Upload to Firebase Storage
    const downloadURL = await FirebaseService.uploadImage(file, 'alice', 'wonderland-map.svg');
    
    console.log('Map image uploaded successfully!');
    console.log('Download URL:', downloadURL);
    
    // Update the aliceData with the new map URL
    console.log('You can now update aliceData.ts with this URL:', downloadURL);
    
  } catch (error) {
    console.error('Failed to upload map image:', error);
  }
}

// Run the upload
uploadMapImage(); 