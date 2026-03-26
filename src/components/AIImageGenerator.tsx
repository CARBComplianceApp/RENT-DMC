import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Image as ImageIcon, Loader2, Wand2, Upload, X } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const AIPropertyVisualizer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSourceImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const generateImage = async () => {
    if (!prompt.trim() && !sourceImage) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const parts: any[] = [];
      
      if (sourceImage) {
        const base64Data = sourceImage.split(',')[1];
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: "image/png"
          }
        });
      }

      parts.push({
        text: sourceImage 
          ? `Edit or enhance this property image based on this request: ${prompt}. Maintain the architectural structure but apply the requested changes. Style: High-end, professional architectural photography.`
          : `High-end, professional architectural photography of a modern rental property. Style: Luxury, clean, professional. Context: ${prompt}`,
      });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
          },
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          setGeneratedImage(`data:image/png;base64,${base64EncodeString}`);
          break;
        }
      }
    } catch (err) {
      console.error("Generation error:", err);
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-irish-green/10 border border-irish-green/20 text-irish-green text-xs font-medium uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            Nano Banana 2 Powered
          </div>
          <h2 className="text-5xl font-bold tracking-tight text-white leading-tight font-serif">
            Visualize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-irish-green to-irish-orange">Property's Potential</span>
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Use our integrated AI to generate high-fidelity marketing visuals for your listings. 
            Describe the vision, and RENT DMC handles the aesthetics.
          </p>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-irish-green to-irish-orange rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
            <div className="relative flex flex-col p-2 bg-zinc-900 border border-zinc-800 rounded-2xl">
              {sourceImage && (
                <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-zinc-700">
                      <img src={sourceImage} className="w-full h-full object-cover" alt="Source" />
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">Reference image attached</div>
                  </div>
                  <button 
                    onClick={() => setSourceImage(null)}
                    className="p-1 hover:bg-zinc-800 rounded-full text-zinc-500 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={sourceImage ? "Describe changes to this image..." : "e.g., A modern penthouse with sunset views..."}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-white px-4 py-3 placeholder:text-zinc-600 font-mono"
                  onKeyDown={(e) => e.key === 'Enter' && generateImage()}
                />
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 text-zinc-500 hover:text-irish-green hover:bg-zinc-800 rounded-xl transition-all"
                  title="Upload reference photo"
                >
                  <Upload className="w-5 h-5" />
                </button>
                <button
                  onClick={generateImage}
                  disabled={isGenerating || (!prompt.trim() && !sourceImage)}
                  className="flex items-center gap-2 px-6 py-3 bg-irish-orange hover:bg-irish-orange-lt disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-semibold rounded-xl transition-all active:scale-95"
                >
                  {isGenerating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Wand2 className="w-5 h-5" />
                  )}
                  {sourceImage ? 'Enhance' : 'Generate'}
                </button>
              </div>
            </div>
          </div>
          
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        <div className="relative aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-zinc-900/50 backdrop-blur-sm z-10"
              >
                <div className="w-12 h-12 border-4 border-irish-green/20 border-t-irish-green rounded-full animate-spin" />
                <p className="text-zinc-400 font-medium animate-pulse">Crafting your vision...</p>
              </motion.div>
            ) : generatedImage ? (
              <motion.img
                key="image"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                src={generatedImage}
                alt="Generated property"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-zinc-600"
              >
                <ImageIcon className="w-16 h-16 opacity-20" />
                <p className="text-sm font-medium">Your AI-generated masterpiece will appear here</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-[10px] text-white/60 font-mono uppercase tracking-widest">
            4K Render Engine
          </div>
        </div>
      </div>
    </section>
  );
};
