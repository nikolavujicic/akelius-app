import { HTTPMethods } from 'fastify'

interface Route {
  name: string
  method: string
  url: string
}

export class RoutesService {
  static #instance: RoutesService
  #routes: Route[] = []

  private constructor() {}

  static instance(): RoutesService {
    if (this.#instance) {
      return this.#instance
    }

    this.#instance = new RoutesService()

    return this.#instance
  }

  get routes(): Route[] {
    return this.#routes
  }

  add(host: string, name: string, method: HTTPMethods | HTTPMethods[], url: string): void {
    let newName = name

    if (method === 'HEAD') {
      return
    }

    if (url.includes(':id')) {
      newName = name.slice(0, -1)
    }

    this.#routes.push({
      name: newName,
      method: Array.isArray(method) ? method.join(', ') : method,
      url: host + url,
    })
  }
}
