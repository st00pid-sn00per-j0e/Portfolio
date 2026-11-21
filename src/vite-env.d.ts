/// <reference types="vite/client" />
/// <reference types="vite-imagetools/client" />

// Fallback if the imagetools/client types don't resolve:
declare module "*?hero" {
  const result: {
    sources: { avif: string; webp: string };
    img: { src: string; w: number; h: number };
  };
  export default result;
}

declare module "*?hero=alpha" {
  const result: {
    sources: { avif: string; webp: string };
    img: { src: string; w: number; h: number };
  };
  export default result;
}

declare module "*.glb?url" {
  const src: string;
  export default src;
}

declare module "*.glb" {
  const src: string;
  export default src;
}