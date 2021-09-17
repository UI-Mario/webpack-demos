const a: number = 123;

new Promise<void>((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 3000);
});
