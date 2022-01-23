import get from './get.js'

class Gallery {
    constructor(element) {
        this.container = element
        this.imgList = [...element.querySelectorAll('.img')]
        this.modal = get('.modal')
        this.modalMainImg = get('.main-img')
        this.modalImages = get('.modal-images')
        this.imageName = get('.image-name')
        this.closeBtn = get('.close-btn')
        this.prevBtn = get('.prev-btn')
        this.nextBtn = get('.next-btn')
        // binding
        this.closeModal = this.closeModal.bind(this)
        this.nextImage = this.nextImage.bind(this)
        this.prevImage = this.prevImage.bind(this)
        this.displayImage = this.displayImage.bind(this)
        // adding event listener to container
        this.container.addEventListener('click', function(e) {
            if(e.target.classList.contains('img')){
                this.OpenModal(e.target, this.imgList)
            }
        }.bind(this))
    }
    
    OpenModal(chooseImg, images) {
        this.setMainImage(chooseImg)
        this.modalImages.innerHTML = images.map(item => {
            return `<img src=${item.src} title=${item.title} data-id=${item.dataset.id} class="${item.dataset.id === chooseImg.dataset.id ? 'modal-img selected' : "modal-img"}" alt=${item.title}>`
        }).join('')
        this.modal.classList.add('open')
        this.closeBtn.addEventListener('click', this.closeModal)
        this.nextBtn.addEventListener('click', this.nextImage)
        this.prevBtn.addEventListener('click', this.prevImage)
        this.modalImages.addEventListener('click', this.displayImage)
    }

    closeModal() {
        this.modal.classList.remove('open')
        this.closeBtn.removeEventListener('click', this.closeModal)
        this.nextBtn.removeEventListener('click', this.nextImage)
        this.prevBtn.removeEventListener('click', this.prevImage)
    }
    setMainImage(selected) {
        this.modalMainImg.src = selected.src
        this.imageName.textContent = selected.title
    }

    nextImage() {
        const selected = this.modalImages.querySelector('.selected')
        const next = selected.nextElementSibling || this.modalImages.firstElementChild
        selected.classList.remove('selected')
        this.setMainImage(next)
        next.classList.add('selected')
    }

    prevImage() {
        const target = this.modalImages.querySelector('.selected')
        const prev = target.previousElementSibling || this.modalImages. lastElementChild
        target.classList.remove('selected')
        this.setMainImage(prev)
        prev.classList.add('selected')
    }
    displayImage(e) {
        const element = this.modalImages.querySelector('.selected')
        e.target.classList.add('selected')
        element.classList.remove('selected')
        this.setMainImage(e.target)
    }
}

const city = new Gallery(get('.city'))
const nature = new Gallery  (get('.nature'))
