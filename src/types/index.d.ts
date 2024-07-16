declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
declare module "*.png" {
  const value: string;
  export default value;
}
declare module "*.svg" {
  const value: string;
  export default value;
}
declare module "react-google-maps" {
  export var GoogleMap: GoogleMap;
}

interface GoogleMap {
  (any): any;
}
