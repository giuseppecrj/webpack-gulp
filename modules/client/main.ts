import { module, element, bootstrap } from 'angular'
import * as template from './main.pug'

class AppController {
  constructor () {
    'ngInject'
    this.name = 'Peter'
  }
}

const app = module('app', [])
  .component('app', {
    template,
    controller: AppController
  })

element(document).ready(() => {
  bootstrap(document, [app.name], {
    strictDi: true
  })
})
