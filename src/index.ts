import express from "express"
import cors from 'cors'
import routes from './routes'

class Index {
  public express: express.Application

  constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private routes(): void {
    this.express.use(routes)
  }

}

export default new Index().express
