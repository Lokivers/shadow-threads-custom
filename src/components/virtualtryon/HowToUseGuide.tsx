
import React from 'react';

const HowToUseGuide: React.FC = () => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">How to use Virtual Try-On</h3>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Click "Start Camera" to activate your webcam</li>
        <li>Position yourself in the frame, facing forward</li>
        <li>Use the controls to position and size the t-shirt</li>
        <li>Adjust the rotation to match your body position</li>
        <li>Select your preferred size</li>
        <li>Click "Add to Cart" when you're happy with how it looks</li>
      </ol>
    </div>
  );
};

export default HowToUseGuide;
