import React, { useEffect } from "react";

interface ContentDisplayProps {
  content: string;
}

interface ContentDisplayProps {
  content: string;
  isContentVisible: boolean; 
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content, isContentVisible }) => {
  useEffect(() => {
    // Emitir un evento personalizado cuando el contenido se carga
    window.dispatchEvent(new CustomEvent("contentdisplayed"));
  }, [content]); // Dependencia en el contenido para reemitir cuando cambie

return (
    content !== "" && (
      <div className={`displayContent ${!isContentVisible ? 'hidden' : ''}`}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    )
  );
};

export default ContentDisplay;
