// INFO
// get languages: https://business-school.production.languages.akelius.com/content/api/v1/subjects (get from languageCode and distinct)
// get subjects: https://business-school.production.languages.akelius.com/content/api/v1/subjects
// get one subject: https://business-school.production.languages.akelius.com/content/api/v1/subjects/1970
// get list of contents: https://business-school.production.languages.akelius.com/content/api/v1/language/index?languageCode=en&platformType=LANGUAGES
// get slides: https://business-school.production.languages.akelius.com/media/api/v1/slideshows/45250/slides?page=0&size=50
// get slide: https://business-school.production.languages.akelius.com/media/api/v1/slides/994925

import cors from '@fastify/cors'
import Fastify, { FastifyRequest } from 'fastify'
import languages from './data/languages.json'
import level0 from './data/level_0.json'
import levels from './data/levels.json'
import slide0 from './data/slide_0.json'
import slide1 from './data/slide_1.json'
import slide2 from './data/slide_2.json'
import slideshow1 from './data/slideshow_1.json'
import { RoutesService } from './utils'

interface Params {
  id: string | undefined
}

// settings
const LOGGER = false
const PORT = 3000
const HOST = '0.0.0.0'

const fastify = Fastify({
  logger: LOGGER,
})
fastify.register(cors)

const routesService = RoutesService.instance()
fastify.addHook('onRoute', (route) => {
  routesService.add(HOST, route.path.split('/')[1], route.method, route.url)
})

fastify.addHook('onReady', (done) => {
  console.log('\n')
  console.table(routesService.routes)

  done()
})

// routes
fastify.get('/languages', async function handler() {
  return languages
})

fastify.get('/levels', async function handler() {
  return levels
})

fastify.get('/levels/:id', async function handler(request, reply) {
  const id = getIdParam(request)

  if (id !== level0.id) {
    return reply.status(404).send({ message: `The level with the id ${id} does not exists` })
  }

  return level0
})

fastify.get('/slideshows/:id', async function handler(request, reply) {
  const id = getIdParam(request)

  if (id !== slideshow1.id) {
    return reply.status(404).send({ message: `The slideshow with the id ${id} does not exists` })
  }

  return slideshow1
})

fastify.get('/slides/:id', async function handler(request, reply) {
  const id = getIdParam(request)

  const slides = new Map()
  slides.set(0, slide0)
  slides.set(1, slide1)
  slides.set(2, slide2)

  if (!slides.has(id)) {
    return reply.status(404).send({ message: `The slide with the id ${id} does not exists` })
  }

  const slide = slides.get(id)

  return slide
})

// run the server
;(async (): Promise<void> => {
  try {
    await fastify.listen({ port: PORT, host: HOST });

    console.log(`\nServer running on http://${HOST}:${PORT}`);
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})()

function getIdParam(request: FastifyRequest): number | null {
  const { id: idFromRequestParam } = request.params as Params

  if (typeof idFromRequestParam === 'undefined') {
    return null
  }

  const id = parseInt(idFromRequestParam)

  return id
}
