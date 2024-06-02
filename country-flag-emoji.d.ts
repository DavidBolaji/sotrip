declare module 'country-flag-emoji' {
    interface CountryFlag {
      name: string;
      emoji: string;
      unicode: string;
      code: string;
    }
  
    function get(code: string): string;
  
    function list(): CountryFlag[];
  
    export { get, list };
  }
  