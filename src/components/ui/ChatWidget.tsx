'use client'

import React, { useState, useEffect } from 'react'

export function ChatWidget() {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Listen for messages from the iframe indicating state changes
    const handleMessage = (event: MessageEvent) => {
      // Security check could be added here
      if (event.data === 'chat-open' || event.data?.type === 'chat-open') {
        setIsExpanded(true)
      }
      if (event.data === 'chat-close' || event.data?.type === 'chat-close') {
        setIsExpanded(false)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div 
      className={`fixed bottom-0 right-0 z-[9999] transition-all duration-300 ${
        isExpanded ? 'w-full sm:w-[400px] h-full sm:h-[650px]' : 'w-[100px] h-[100px]'
      }`}
    >
      {/* 
        This iframe loads the AI service widget. 
        It has pointer-events auto. We use a hovering wrapper so that clicks pass through 
        the transparent areas if the widget is closed (though we size the wrapper down).
        If the widget doesn't use postMessage, we default to fixed height for safety.
      */}
      <iframe
        src="https://middlepark-ai-service-480235407496.us-central1.run.app/widget"
        className="w-full h-full border-none shadow-none bg-transparent"
        style={{
          colorScheme: 'light',
        }}
        allow="microphone; camera"
      />
      
      {/* 
        Fallback interaction layer:
        If the widget developer didn't implement 'chat-open' postMessage,
        we listen to pointer events in the lower right corner and expand it natively
        when they click roughly where the chat bubble is.
      */}
      {!isExpanded && (
        <div 
          className="absolute bottom-4 right-4 w-16 h-16 cursor-pointer z-10" 
          onClick={() => setIsExpanded(true)}
          style={{ background: 'transparent' }} // Invisible hit area over the bubble
        />
      )}
    </div>
  )
}
