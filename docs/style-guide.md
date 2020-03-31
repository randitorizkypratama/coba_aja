# Style Guide

- [Single File Components](#single-file-components)

## Single File Components(SFC)

### **PascalCase**

Semua nama file dan pemanggilan komponen harus memakai **PascalCase** contohnya **app-header-home** menjadi AppHeaderHome. Alasannya supaya kita tahu itu merupakan sebuah component dari Vue, karena spec dari web components pakai kebab-case. [Referensi](https://vuejs.org/v2/style-guide/#Single-file-component-filename-casing-strongly-recommended)

### **No One Word**

Semua nama file dan pemanggilan komponen harus memakai lebih dari satu kata contohnya **carousel** menjadi **CarouselHome**. Alasannya supaya tidak bentrok dengan tag-tag default dari HTML baik yang ada saat ini maupun di masa yang akan datang. [Referensi](https://vuejs.org/v2/style-guide/#Multi-word-component-names-essential)

### **Easy Sorting**

Usahakan penamaan file-file yang tergabung dalam satu folder mudah untuk diurutkan contohnya **app-header-home** menjadi **HomeAppHeader**, **app-footer-home** menjadi **HomeAppFooter**. Sambil jalan kita bisa diskusi bersama untuk menentukan namanya. [Referensi](https://vuejs.org/v2/style-guide/#Order-of-words-in-component-names-strongly-recommended)

### **Component Name Property**

```js
export default {
  name: 'Carousel',
};
```

Property **name** TIDAK PERLU karena akan otomatis ambil dari nama file.

### **Data Initialization**

Untuk penulisan data pakai format berikut, kecuali perlu manipulasi nilai awal dari sebuah data.

```js
// BAD
data() {
  return {
    coba: 'dulu'
  }
}

// GOOD
data: () => ({
  coba: 'dulu'
})
```
