import React from 'react';

export const AppSkeleton: React.FC = () => {
  // Definir la animación de pulso con CSS en JavaScript
  const pulseKeyframes = `
    @keyframes pulse {
      0% { opacity: 0.6; }
      100% { opacity: 1; }
    }
  `;

  return (
    <div 
      style={{
        padding: '40px 20px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        animation: 'pulse 1.5s ease-in-out infinite alternate'
      }}
    >
      {/* Inyectar los keyframes de animación */}
      <style dangerouslySetInnerHTML={{ __html: pulseKeyframes }} />
      
      {/* Título Skeleton */}
      <div 
        style={{
          height: '38px',
          width: '70%',
          backgroundColor: '#e0e0e0',
          borderRadius: '4px',
          marginBottom: '40px'
        }}
      />
      
      {/* Contenedor de imágenes Skeleton */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        marginBottom: '40px'
      }}>
        {/* Logo 1 Skeleton */}
        <div style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#e0e0e0',
          borderRadius: '8px'
        }} />
        
        {/* Logo 2 Skeleton */}
        <div style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#e0e0e0',
          borderRadius: '8px'
        }} />
      </div>
      
      {/* Skeleton para el componente de información */}
      <div 
        style={{
          backgroundColor: '#f6f7f8',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <div 
          style={{
            height: '28px',
            width: '60%',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            marginBottom: '15px'
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[1, 2, 3, 4, 5, 6].map(item => (
            <div 
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div 
                style={{
                  height: '16px',
                  width: '120px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                  marginRight: '10px'
                }}
              />
              <div 
                style={{
                  height: '16px',
                  width: item % 2 === 0 ? '200px' : '150px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 