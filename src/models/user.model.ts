import crypto from 'crypto';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del usuario
 *         username:
 *           type: string
 *           description: Nombre de usuario único
 *         email:
 *           type: string
 *           format: email
 *           description: Email único del usuario
 *         password:
 *           type: string
 *           format: password
 *           description: Contraseña del usuario (solo para creación, no se devuelve en respuestas)
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del usuario
 */

// Interfaz de usuario para TypeScript
export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  created_at?: Date;
}

// Clase para manejar las operaciones de usuario en memoria
export class UserModel {
  private users: User[] = [];
  private lastId = 0;

  constructor() {
    // Inicialización vacía
  }

  // Método para encriptar la contraseña
  private hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
  }

  // Método para verificar la contraseña
  verifyPassword(storedPassword: string, suppliedPassword: string): boolean {
    const [salt, hash] = storedPassword.split(':');
    const suppliedHash = crypto.pbkdf2Sync(suppliedPassword, salt, 1000, 64, 'sha512').toString('hex');
    return hash === suppliedHash;
  }

  // Registrar un nuevo usuario
  async createUser(user: User): Promise<User> {
    const { username, email, password } = user;
    
    // Hash de la contraseña
    const hashedPassword = this.hashPassword(password);
    
    // Incrementar el ID y crear el nuevo usuario
    const id = ++this.lastId;
    const newUser = {
      id,
      username,
      email,
      password: hashedPassword,
      created_at: new Date()
    };
    
    // Guardar en el array de usuarios
    this.users.push(newUser);
    
    // Devolver el usuario creado (sin contraseña)
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword as User;
  }

  // Buscar usuario por email
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email);
    return user || null;
  }

  // Buscar usuario por nombre de usuario
  async findByUsername(username: string): Promise<User | null> {
    const user = this.users.find(u => u.username === username);
    return user || null;
  }

  // Obtener todos los usuarios (sin devolver las contraseñas)
  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    return this.users.map(user => {
      const { password: _password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
} 