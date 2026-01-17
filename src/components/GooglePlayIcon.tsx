const GooglePlayIcon = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="playGradientFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C4A7" />
          <stop offset="25%" stopColor="#00B4DB" />
          <stop offset="50%" stopColor="#0083B0" />
          <stop offset="75%" stopColor="#F7971E" />
          <stop offset="100%" stopColor="#FFD200" />
        </linearGradient>
      </defs>
      <path 
        fill="#EA4335" 
        d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z"
      />
      <path 
        fill="#34A853" 
        d="M47 512c-12.7-6.8-21.7-19.2-21.7-35.3V35.3c0-16.1 9-28.5 21.7-35.3l256.6 256L47 512z"
      />
      <path 
        fill="#FBBC05" 
        d="M325.3 277.7l-60.1-60.1 60.1-60.1 145.7 84.3c18.7 10.8 18.7 28.5 0 39.3l-145.7 84.3-60.1-60.1 60.1-27.6z"
      />
      <path 
        fill="#4285F4" 
        d="M325.3 277.7L104.6 499l221.7-194.7-1-26.6z"
      />
      <path 
        fill="#EA4335" 
        d="M104.6 13l220.7 204.3-60.1 60.4L104.6 499V13z"
      />
    </svg>
  );
};

export const GooglePlayIconSimple = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92z" fill="#00D7FE"/>
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92z" fill="url(#a)"/>
      <path d="M17.556 8.232l-3.764 3.768 3.764 3.768 4.247-2.452a1 1 0 0 0 0-1.632l-4.247-2.452z" fill="#FFCE00"/>
      <path d="M13.792 12L3.609 22.186c.181.087.382.127.583.117a1 1 0 0 0 .508-.173l13.103-7.578L13.792 12z" fill="#F33D55"/>
      <path d="M3.609 1.814l14.184 8.37L13.792 12 3.609 1.814z" fill="#00EE76"/>
      <defs>
        <linearGradient id="a" x1="8.701" y1="6.908" x2="3" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00A3FF"/>
          <stop offset="1" stopColor="#00D7FE"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default GooglePlayIcon;
