import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'
import { jest } from '@jest/globals'

// Necesario para MUI (React 18)
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock de ResizeObserver
global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

// Mock de window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})

// Mock de scrollTo
window.scrollTo = jest.fn()

// Suprimir warnings de console específicos durante las pruebas
const originalError = console.error
const originalWarn = console.warn

console.error = (...args) => {
    if (
        /Warning: ReactDOM.render is no longer supported in React 18./.test(args[0]) ||
        /Warning: useLayoutEffect does nothing on the server/.test(args[0])
    ) {
        return
    }
    originalError.call(console, ...args)
}

console.warn = (...args) => {
    if (
        /Warning: React.createElement: type is invalid/.test(args[0]) ||
        /Warning: Failed prop type/.test(args[0])
    ) {
        return
    }
    originalWarn.call(console, ...args)
}
  