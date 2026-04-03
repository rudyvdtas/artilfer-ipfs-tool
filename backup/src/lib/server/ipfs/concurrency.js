/**
 * Concurrency limiter using semaphore pattern
 * Prevents overwhelming the Kubo node with unbounded concurrent requests
 */

export class Semaphore {
  constructor(max = 5) {
    this.max = max
    this.current = 0
    this.queue = []
  }

  async acquire() {
    if (this.current < this.max) {
      this.current++
      return
    }

    // Wait for release
    await new Promise((resolve) => {
      this.queue.push(resolve)
    })
  }

  release() {
    this.current--
    const resolve = this.queue.shift()
    if (resolve) {
      this.current++
      resolve()
    }
  }

  async run(fn) {
    await this.acquire()
    try {
      return await fn()
    } finally {
      this.release()
    }
  }
}

// ✅ Global semaphore: max 5 concurrent CID fetches
export const fetchSemaphore = new Semaphore(5)
