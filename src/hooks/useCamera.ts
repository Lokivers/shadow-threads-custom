
import { useState, useRef, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

export const useCamera = () => {
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  
  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setVideoStream(stream);
        setCameraActive(true);
        toast.success("Camera started successfully");
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error("Could not access camera. Please check permissions.");
    }
  };
  
  // Stop camera
  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
      setCameraActive(false);
    }
  };
  
  // Take screenshot
  const takeScreenshot = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Set canvas dimensions to match video
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        
        // Draw video frame to canvas
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        
        toast.success("Screenshot taken!");
        return true;
      }
    }
    return false;
  };
  
  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoStream]);

  return {
    cameraActive,
    videoRef,
    canvasRef,
    videoStream,
    startCamera,
    stopCamera,
    takeScreenshot
  };
};
