// абстракция
interface Camera {
    takePhoto(photo: string): void  // внутренняя реализация не важна, контракт реализует только важные нам свойства объекта
}

class CameraImpl implements Camera {
    memory = 100
    photos: string[] = []

    takePhoto(photo: string) {
        if (this.memory > photo.length) {
            this.photos.push(photo)
            this.memory -= photo.length
        }
    }
}

// но есть проблема. наружу так же торчат memory и photos, доступ к которым может получить кто-то другой
// поэтому используем инкапсуляцию, чтобы ограничить доступ к внутренней реализвции из вне
// это и будет инкапсуляция
class SavedCameraImpl implements Camera {
    private memory = 100
    private photos: string[] = []

    takePhoto(photo: string) {
        if (this.memory > photo.length) {
            this.photos.push(photo)
            this.memory -= photo.length
        }
    }
}