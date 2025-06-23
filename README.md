# README - CRUD de Usuarios con Vue.js

## Descripción del Proyecto

Aplicación web desarrollada con Vue.js 3 para la gestión completa de usuarios (CRUD) que consume la API pública de JSONPlaceholder. Esta aplicación permite crear, leer, actualizar y eliminar usuarios de forma local tras la carga inicial desde la API.

## Características Principales

- **Listado de usuarios** con tabla responsiva
- **Formularios modales** para crear y editar usuarios
- **Validaciones** completas con feedback visual
- **Confirmación de eliminación** antes de borrar usuarios
- **Gestión de estado local** - todas las operaciones CRUD se realizan en memoria
- **Indicadores de carga** durante las peticiones a la API
- **Diseño responsivo** con TailwindCSS

## Tecnologías Utilizadas

- **Vue 3** (Composition API)
- **Vue Router** (para navegación)
- **Pinia** (para gestión de estado)
- **Axios** (para consumo de API)
- **TailwindCSS** (para estilos)
- **Vite** (como bundler)
- **Vuelidate** (para validaciones de formularios)

## API Utilizada

La aplicación consume la API pública de JSONPlaceholder:
- **Endpoint**: `https://jsonplaceholder.typicode.com/users`
- **Método**: Solo GET para carga inicial
- **Datos**: name, username, email, phone

## Estructura del Proyecto

```
src/
├── components/
│   └── UserForm.vue          # Formulario modal para crear/editar usuarios
├── views/
│   └── UserList.vue          # Vista principal con tabla de usuarios
├── store/
│   └── user.js               # Store de Pinia para gestión de usuarios
├── router/
│   └── index.js              # Configuración de rutas
├── App.vue                   # Componente principal
├── main.js                   # Punto de entrada
└── style.css                # Estilos globales
```

## Instalación y Configuración

1. **Clonar el repositorio:**
```bash
git clone https://github.com/loweffort-alt/vue-users-crud-technical-test.git
cd vue-users-crud-technical-test
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Iniciar servidor de desarrollo:**
```bash
npm run dev
```

4. **Construir para producción:**
```bash
npm run build
```

## Funcionalidades Implementadas

### ✅ Listado de Usuarios
- Tabla con columnas: Nombre, Username, Email, Teléfono, Acciones
- Carga inicial desde la API de JSONPlaceholder
- Indicador de loading durante la carga
- Manejo de errores de conexión

### ✅ Agregar Usuario
- Formulario modal con validaciones
- Validación obligatoria de email válido
- Generación automática de ID secuencial
- Almacenamiento solo en memoria local

### ✅ Editar Usuario
- Formulario pre-poblado con datos actuales
- Validaciones en tiempo real
- Actualización inmediata en la tabla
- Modal reutilizable para crear/editar

### ✅ Eliminar Usuario
- Confirmación antes de eliminar
- Eliminación inmediata de la tabla
- Feedback visual de la acción

## Validaciones Implementadas

- **Nombre**: Campo obligatorio
- **Username**: Campo obligatorio
- **Email**: Campo obligatorio + formato válido
- **Teléfono**: Campo obligatorio
- **Feedback visual**: Bordes rojos en campos con errores
- **Mensajes de error**: Textos explicativos bajo cada campo

## Criterios de Evaluación Cumplidos

- ✅ **Estructura del proyecto**: Organización clara con componentes reutilizables
- ✅ **Uso de Vue.js**: Composition API con hooks reactivos
- ✅ **Manejo de estado local**: Pinia store para gestión completa del CRUD
- ✅ **Validaciones y UX**: Validaciones completas con Vuelidate
- ✅ **Legibilidad del código**: Código limpio, comentado y bien estructurado
- ✅ **Componentes reutilizables**: Modal de formulario reutilizable
- ✅ **Vue Router**: Navegación configurada (extensible)

## Decisiones de Diseño

### Gestión de Estado
- **Pinia** para manejo centralizado del estado
- **Operaciones locales**: Solo GET inicial, resto en memoria
- **Reactividad**: Estado reactivo para actualizaciones inmediatas

### Validaciones
- **Vuelidate** para validaciones robustas
- **Validación de email**: Formato obligatorio según requerimientos
- **Feedback inmediato**: Validación en tiempo real

### Interfaz de Usuario
- **Modal forms**: Mejor UX que formularios inline
- **Confirmación de eliminación**: `confirm()` nativo según requerimientos
- **Diseño responsivo**: Tabla adaptable a diferentes pantallas
- **Estados de carga**: Indicadores visuales durante operaciones

## Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Construcción
npm run build

# Preview de producción
npm run preview

# Linting
npm run lint
```

## Estructura de Datos

### Usuario
```javascript
{
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string
}
```

## Notas Técnicas

- **Solo carga inicial de API**: Cumple con requerimiento de no enviar datos a la API
- **IDs automáticos**: Generación secuencial para nuevos usuarios
- **Persistencia**: Datos se pierden al recargar (según especificaciones)
- **Validación de email**: Implementada según requerimientos obligatorios

## Autor

**Alex Farfán Navarro**
- GitHub: [@loweffort-alt](https://github.com/loweffort-alt)
- Prueba técnica: CRUD de Usuarios con Vue.js

---

*Desarrollado como parte de una prueba técnica para demostrar competencias en Vue.js, gestión de estado, validaciones y mejores prácticas de desarrollo frontend.*
