import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt  from "bcrypt";

// Crear un usuario
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, lastname, email, password } = req.body;
    Validation.validateName(name)
    Validation.validatePassword(password)
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ name, lastname, email, password: hashedPassword });
    await user.save();
    res.status(201).json(user.id);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Actualizar un usuario
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, lastname, email, password } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, lastname, email, password },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Eliminar un usuario
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

class Validation {
  static validateName (name:string) {
    if (typeof name !== 'string') throw new Error('el usuario no es string')
    if (name.length < 3) throw new Error('el usuario no puede ser menor a 3 caracteres')
  }

  static validatePassword (password:string) {
    if (typeof password !== 'string') throw new Error('el passwordd no es string')
    if (password.length < 3) throw new Error('el passwordd no puede ser menor a 3 caracteres')
  }
}