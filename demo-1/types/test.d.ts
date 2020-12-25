declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

declare class Animal {
  name: string;
  constructor(name: string);
  sayHi(): string;
}

// TODO:
declare const global_const = 99;

declare global {
  // ts的global variable的声明方式
  // TODO:这究竟是在什么时候起的作用？编译后？
  interface StringConstructor {
    readonly testProperty: number;
  }
}
