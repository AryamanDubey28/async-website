'use client';

import { useEffect, useRef, useState } from 'react';
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
import styles from '@/styles/markdown.module.css';

interface BlogContentProps {
  contentHtml: string;
}

export default function BlogContent({ contentHtml }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // First useEffect: Mark client-side rendering complete
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Second useEffect: Process content after hydration is complete
  useEffect(() => {
    if (isClient && contentRef.current) {
      // Process code blocks
      const preTags = contentRef.current.querySelectorAll('pre');
      preTags.forEach(preTag => {
        // If there's a code element inside without a language class
        const codeEl = preTag.querySelector('code');
        if (codeEl && !codeEl.className.includes('language-')) {
          // Add default language class if none is detected
          codeEl.className = 'language-javascript line-numbers'; 
          preTag.className = 'language-javascript line-numbers';
        }
        
        // Make sure the pre element has the line-numbers class for Prism
        if (!preTag.className.includes('line-numbers')) {
          preTag.className += ' line-numbers';
        }
      });
      
      // Process tables to ensure they render correctly
      const tables = contentRef.current.querySelectorAll('table');
      tables.forEach(table => {
        if (!table.querySelector('thead') && table.rows.length > 0) {
          // If no thead exists but there are rows, create one from the first row
          const thead = document.createElement('thead');
          const firstRow = table.rows[0];
          thead.appendChild(firstRow.cloneNode(true));
          table.insertBefore(thead, table.firstChild);
          table.deleteRow(0);
        }
        
        // Ensure there's a tbody if not already present
        if (!table.querySelector('tbody') && table.rows.length > 0) {
          const tbody = document.createElement('tbody');
          while (table.rows.length > 0) {
            tbody.appendChild(table.rows[0]);
          }
          table.appendChild(tbody);
        }
      });
      
      // Process callouts/notes to ensure they have proper styling
      const divs = contentRef.current.querySelectorAll('div');
      divs.forEach(div => {
        // Look for common callout patterns and apply appropriate classes
        const text = div.textContent?.toLowerCase() || '';
        const firstChild = div.firstChild;
        
        if (div.className.includes('callout') || div.className.includes('note')) {
          // Already has a class, leave it
          return;
        }
        
        // Check for common callout titles and apply appropriate classes
        if (text.startsWith('note:') || text.startsWith('info:')) {
          div.classList.add('info');
        } else if (text.startsWith('warning:') || text.startsWith('caution:')) {
          div.classList.add('warning');
        } else if (text.startsWith('danger:') || text.startsWith('error:')) {
          div.classList.add('danger');
        } else if (text.startsWith('tip:') || text.startsWith('success:')) {
          div.classList.add('success');
        }
        
        // Check if div has blockquote as first child (common in some markdown processors)
        if (firstChild instanceof HTMLQuoteElement) {
          const quoteText = firstChild.textContent?.toLowerCase() || '';
          if (quoteText.startsWith('note:') || quoteText.startsWith('info:')) {
            div.classList.add('info');
          } else if (quoteText.startsWith('warning:') || quoteText.startsWith('caution:')) {
            div.classList.add('warning');
          } else if (quoteText.startsWith('danger:') || quoteText.startsWith('error:')) {
            div.classList.add('danger');
          } else if (quoteText.startsWith('tip:') || quoteText.startsWith('success:')) {
            div.classList.add('success');
          }
        }
      });
      
      // Apply Prism highlighting
      Prism.highlightAllUnder(contentRef.current);
    }
  }, [isClient, contentHtml]);

  return (
    <div 
      ref={contentRef} 
      className={`${styles.markdownContainer} blog-content`}
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
} 