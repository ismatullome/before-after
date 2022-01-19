function Template(state) {
  return `
    <div class="box__slider--before" style="width: ${state.width}px; background-image: url(${state.before}) ">
      <div class="box__resize" data-type="resize"></div>
    </div>
    <div class="box__slider--after" style="background-image: url(${state.after};"></div>
  `
}

class Slider {
  constructor(selector, state) {
    // id slider         start state

    this.$slider = document.getElementById(selector)
    this.state = {
      ...state,
      width: state.width || 424,
    }
    this.#render(this.state)
    this.#listen()
  }

  #listen() {
    this.mouseDownHandler = this.mouseDownHandler.bind(this)
    this.mouseUpHandler = this.mouseUpHandler.bind(this)
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this)
    this.$slider.addEventListener('mousedown', this.mouseDownHandler)
    this.$slider.addEventListener('mouseup', this.mouseUpHandler)
  }

  //private function render
  #render(state) {
    this.$slider.innerHTML = Template(state)
  }

  #update(props) {
    this.state = {
      ...this.state,
      ...props,
    }
    this.#render(this.state)
  }

  mouseDownHandler(event) {
    if (event.target.dataset.type === 'resize') {
      this.$slider.addEventListener('mousemove', this.mouseMoveHandler)
      console.log('down')
      this.currentClienX = event.clientX
    }
  }
  mouseUpHandler(event) {
    this.$slider.removeEventListener('mousemove', this.mouseMoveHandler)
    console.log('up')
  }
  mouseMoveHandler(event) {
    // получаем разницу по х
    let newClientX = this.currentClienX - event.clientX
    this.#update({ width: this.state.width - newClientX })
    this.currentClienX = event.clientX
  }
}

const slider = new Slider('box', {
  after: './assets/after.jpg',
  before: './assets/before.jpg',
})
