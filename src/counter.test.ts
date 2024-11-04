import { setupCounter } from './counter';


describe('setupCounter', () => {
  let button: HTMLButtonElement;

  beforeEach(() => {
    // 建立一個新的 button 元素
    button = document.createElement('button');
    document.body.appendChild(button);
  });

  afterEach(() => {
    // 清理 DOM
    document.body.removeChild(button);
  });

  test('should initialize counter to 0', () => {
    setupCounter(button);
    expect(button.innerHTML).toBe('count is 1');
  });

  test('should increment counter on click', () => {
    setupCounter(button);
    button.click();
    expect(button.innerHTML).toBe('count is 1');
    button.click();
    expect(button.innerHTML).toBe('count is 2');
    button.click();
    expect(button.innerHTML).toBe('count is 3');
  });
});