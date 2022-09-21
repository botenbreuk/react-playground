export function doBlur(onBlur?: () => void): void {
  if (onBlur) {
    onBlur();
  }
}
