import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import authConfig from '../config/auth.config';

export class AuthController {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  // Método para registrar un nuevo usuario
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password } = req.body;

      // Validar los datos
      if (!username || !email || !password) {
        res.status(400).json({ message: 'Todos los campos son requeridos' });
        return;
      }

      // Verificar si el usuario ya existe
      const existingEmail = await this.userModel.findByEmail(email);
      if (existingEmail) {
        res.status(400).json({ message: 'El email ya está registrado' });
        return;
      }

      const existingUsername = await this.userModel.findByUsername(username);
      if (existingUsername) {
        res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        return;
      }

      // Crear el nuevo usuario
      const newUser = await this.userModel.createUser({ username, email, password });

      // Generar token JWT
      const token = jwt.sign(
        { id: newUser.id },
        authConfig.jwtSecret,
        { expiresIn: authConfig.jwtExpiration }
      );

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
        token
      });
    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };

  // Método para iniciar sesión
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Validar los datos
      if (!email || !password) {
        res.status(400).json({ message: 'Email y contraseña son requeridos' });
        return;
      }

      // Buscar el usuario por email
      const user = await this.userModel.findByEmail(email);
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }

      // Verificar contraseña
      const passwordIsValid = this.userModel.verifyPassword(user.password, password);
      if (!passwordIsValid) {
        res.status(401).json({ message: 'Contraseña incorrecta' });
        return;
      }

      // Generar token JWT
      const token = jwt.sign(
        { id: user.id },
        authConfig.jwtSecret,
        { expiresIn: authConfig.jwtExpiration }
      );

      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        token
      });
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };

  // Método para obtener todos los usuarios
  getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userModel.getAllUsers();
      res.status(200).json({
        users,
        count: users.length
      });
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };
} 