'use client';

import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/show-language/prism-show-language';
// Add CSS imports
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

interface BlogContentProps {
  contentHtml: string;
}

export default function BlogContent({ contentHtml }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Prism syntax highlighting
    if (typeof window !== 'undefined' && contentRef.current) {
      // First, enhance any pre tags that don't have language classes
      const preTags = contentRef.current.querySelectorAll('pre');
      preTags.forEach(preTag => {
        // If there's a code element inside without a language class
        const codeEl = preTag.querySelector('code');
        if (codeEl && !codeEl.className.includes('language-')) {
          // Add default language class if none is detected
          codeEl.className = 'language-javascript line-numbers';
          preTag.className = 'language-javascript line-numbers';
        }
        
        // Make sure the pre element has the line-numbers class
        if (!preTag.className.includes('line-numbers')) {
          preTag.className += ' line-numbers';
        }
      });
      
      // Apply Prism highlighting
      Prism.highlightAllUnder(contentRef.current);
    }
  }, [contentHtml]);

  return (
    <div 
      ref={contentRef} 
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
} 