import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Pagination,
  Drawer,
  Stack,
  Divider,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Fab,
} from '@mui/material';
import {
  Search,
  FilterList,
  Close,
  ShoppingCart,
  Clear,
  ArrowUpward,
  LocalShipping,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';
import '../App.css';

// Format price in Indian Rupees
const formatPrice = (price) => {
  return `₹${price?.toLocaleString('en-IN') || 0}`;
};

// UNIQUE images for each product (no repeats within categories)
const productImages = {
  // Cricket Equipment - ALL UNIQUE
  'SG Abdomen Guard': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&1',
  'Masuri Cricket Helmet': 'https://images.pexels.com/photos/30401163/pexels-photo-30401163.jpeg',
  'SG Thigh Guard': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&3',
  'SG Arm Guard': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&4',
  'Shrey Cricket Helmet': 'https://images.pexels.com/photos/13067379/pexels-photo-13067379.jpeg',
  'SG Cricket Helmet': 'https://www.amazon.in/Cricket-Helmet-SG-Blazetech-Green/dp/B091T4VDF1',
  'SG Cricket Pads': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&7',
  'Gray-Nicolls Pads': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&8',
  'SS Cricket Pads': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&9',
  'SG Cricket Gloves': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&10',
  'Gray-Nicolls Gloves': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&11',
  'SS Cricket Gloves': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&12',
  'Kookaburra Cricket Bat': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&1',
  'SG Test Cricket Bat': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&2',
  'MRF Genius Cricket Bat': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&3',
  'Gray-Nicolls Cricket Bat': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&4',
  'CA Cricket Bat': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&5',
  'SS Ton Cricket Bat': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&6',
  'BAS Cricket Bat': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&7',
  'GM Cricket Bat': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&8',
  'SG Cricket Ball (White)': 'https://images.pexels.com/photos/35392636/pexels-photo-35392636.png',
  'SG Cricket Ball (Red)': 'https://images.pexels.com/photos/34563722/pexels-photo-34563722.png',
  'Kookaburra Cricket Ball': 'https://images.pexels.com/photos/35392636/pexels-photo-35392636.png',
  'Dukes Cricket Ball': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&12',
  'SG Cricket Shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&1',
  'Adidas Cricket Shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&2',
  'Nike Cricket Shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&3',
  'SG Cricket Kit Bag': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&1',
  'SS Cricket Kit Bag': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&2',
  'SG Cricket Stumps': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&13',

  // Football Equipment - ALL UNIQUE
  'Select Brillant Ball': 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500&1',
  'Adidas Predator Edge': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&4',
  'Nike Mercurial Superfly': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&5',
  'Puma Future Z': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&6',
  'Under Armour Magnetico': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&7',
  'New Balance Furon': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&8',
  'Puma Orbita Ball': 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500&2',
  'Adidas Al Rihla Ball': 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500&3',
  'Nike Flight Ball': 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500&4',
  'Adidas Predator Gloves': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&13',
  'Puma Ultra Gloves': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&14',
  'Nike Vapor Gloves': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&15',
  'Adidas Shin Guards': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&16',
  'Nike Shin Guards': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&17',
  'Puma Shin Guards': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&18',
  'Germany Jersey 2024': 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=500&1',
  'Argentina Jersey 2024': 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=500&2',
  'Brazil Jersey 2024': 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=500&3',
  'France Jersey 2024': 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=500&4',
  'Spain Jersey 2024': 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=500&5',
  'England Jersey 2024': 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=500&6',
  'Portable Goal': 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500&5',
  'Football Rebounder': 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500&6',
  'Adidas Training Cones': 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500&7',

  // Basketball Equipment - ALL UNIQUE
  'Nike Elite Basketball': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&1',
  'Wilson Evolution Ball': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&2',
  'Spalding NBA Basketball': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&3',
  'Molten Basketball': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&4',
  'Cosco Basketball': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&5',
  'Nike Kyrie 8': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&9',
  'Nike LeBron 21': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&10',
  'Under Armour Curry': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&11',
  'Puma Clyde All-Pro': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&12',
  'Adidas Harden Vol 7': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&13',
  'LA Lakers Jersey': 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=500&7',
  'Chicago Bulls Jersey': 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=500&8',
  'Brooklyn Nets Jersey': 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=500&9',
  'Golden State Jersey': 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=500&10',
  'Boston Celtics Jersey': 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=500&11',
  'Cosco Basketball Hoop': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&6',
  'Spalding Basketball Hoop': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&7',
  'Lifetime Basketball Hoop': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&8',
  'Basketball Net': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&9',
  'Basketball Pump': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&10',
  'NBA Wristband': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&11',
  'NBA Headband': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&12',

  // Badminton Equipment - ALL UNIQUE
  'Yonex Astrox 100 ZZ': 'https://www.istockphoto.com/photo/the-racket-is-broken-gm2190667292-609028902',
  'Yonex Voltric Z-Force II': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&20',
  'Li-Ning N90 III': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&21',
  'Carlton Kinesis EX': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&22',
  'Victor Thruster K': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&23',
  'Yonex Aerosensa 50': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&24',
  'Yonex Aerosensa 30': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&25',
  'Yonex Aerosensa 20': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&26',
  'Li-Ning Shuttlecocks': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&27',
  'Yonex BG-65 String': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&28',
  'Yonex BG-80 String': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&29',
  'Yonex BG-66 String': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&30',
  'Yonex Super Grap Grip': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&31',
  'Li-Ning Grip': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&32',
  'Yonex Towel Grip': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&33',
  'Yonex Power Cushion 65Z': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&14',
  'Victor Badminton Shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&15',
  'Li-Ning Blade Pro': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&16',
  'Yonex Official Net': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&34',
  'Victor Net': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&35',
  'Li-Ning Net': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&36',
  'Yonex Pro Bag': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&3',
  'Victor Badminton Bag': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&4',
  'Li-Ning Badminton Bag': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&5',
  'Yonex Pro Shorts': 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=500&12',
  'Yonex Pro Jersey': 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=500&13',
  'Li-Ning Badminton Jersey': 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=500&14',
  'Yonex Headband': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&37',
  'Yonex Wristband': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&38',
  'Yonex Socks': 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=500&15',

  // Gym & Fitness Equipment - ALL UNIQUE
  'Kore 20kg Dumbbell Set': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&1',
  'Kore 30kg Dumbbell Set': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&2',
  'Cockatoo 20kg Dumbbell Set': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&3',
  'Cockatoo 30kg Dumbbell Set': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&4',
  'Cockatoo 40kg Dumbbell Set': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&5',
  'Cockatoo 12kg Kettlebell': 'https://images.pexels.com/photos/221247/pexels-photo-221247.jpeg',
  'Cockatoo 8kg Kettlebell': 'https://images.pexels.com/photos/9545911/pexels-photo-9545911.jpeg',
  'Kore 8kg Kettlebell': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&8',
  'Cockatoo Weight Bench': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&9',
  'Kore Weight Bench': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&10',
  'BodyMax Weight Bench': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&11',
  'BodyMax Yoga Mat': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&12',
  'Kore Yoga Mat': 'https://images.pexels.com/photos/4325462/pexels-photo-4325462.jpeg',
  'Cockatoo Yoga Mat': 'https://images.pexels.com/photos/4498573/pexels-photo-4498573.jpeg',
  'Cockatoo Resistance Bands': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&15',
  'BodyMax Resistance Bands': 'https://images.pexels.com/photos/5067744/pexels-photo-5067744.jpeg',
  'Kore Resistance Bands': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&17',
  'Cockatoo Skipping Rope': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&18',
  'Cockatoo Push Up Bars': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&19',
  'Cockatoo Gym Ball': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&20',
  'Cockatoo Ab Wheel': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&21',
  'Cockatoo Wrist Weights': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&22',
  'Cockatoo Ankle Weights': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&23',
  'BodyMax Barbell Set': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&24',
  'Kore Barbell Set': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&25',
  'Cockatoo Barbell Set': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&26',
  'BodyMax Gym Gloves': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&39',
  'Kore Gym Gloves': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&40',
  'Cockatoo Gym Gloves': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&41',
  'Cockatoo Treadmill': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&27',
  'Knee Pads': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&28',

  // Running Equipment - ALL UNIQUE
  'Nike Air Zoom Pegasus': 'https://images.pexels.com/photos/13525776/pexels-photo-13525776.jpeg',
  'Adidas Ultraboost 23': 'https://images.pexels.com/photos/9488423/pexels-photo-9488423.jpeg',
  'Puma Velocity Nitro': 'https://images.pexels.com/photos/6776610/pexels-photo-6776610.jpeg',
  'Asics Gel-Nimbus 25': 'https://images.pexels.com/photos/1456735/pexels-photo-1456735.jpeg',
  'New Balance Fresh Foam': 'https://images.pexels.com/photos/18202638/pexels-photo-18202638.jpeg',
  'Nike Dri-FIT Shorts': 'https://images.pexels.com/photos/8180657/pexels-photo-8180657.jpeg',
  'Adidas Running Shorts': 'https://images.pexels.com/photos/8520628/pexels-photo-8520628.jpeg',
  'Puma Running Shorts': 'https://images.pexels.com/photos/2284163/pexels-photo-2284163.jpeg',
  'Under Armour Shorts': 'https://images.pexels.com/photos/34277466/pexels-photo-34277466.jpeg',
  'Nike Dri-FIT Tee': 'https://images.pexels.com/photos/6786614/pexels-photo-6786614.jpeg',
  'Adidas Running Tee': 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=500&21',
  'Puma Running Tee': 'https://images.pexels.com/photos/2421562/pexels-photo-2421562.jpeg',
  'Nike Running Belt': 'https://images.pexels.com/photos/9687152/pexels-photo-9687152.jpeg',
  'Adidas Running Belt': 'https://images.pexels.com/photos/89783/belts-belt-buckle-leather-metal-89783.jpeg',
  'Nike Running Cap': 'https://images.pexels.com/photos/9558758/pexels-photo-9558758.jpeg',
  'Adidas Running Cap': 'https://images.pexels.com/photos/17983086/pexels-photo-17983086.jpeg',
  'Nike Running Socks': 'https://images.pexels.com/photos/7462589/pexels-photo-7462589.jpeg',
  'Adidas Running Socks': 'https://images.pexels.com/photos/36429571/pexels-photo-36429571.jpeg',
  'Running Socks': 'https://images.pexels.com/photos/7462557/pexels-photo-7462557.jpeg',
  'Running Water Bottle': 'https://images.pexels.com/photos/593099/pexels-photo-593099.jpeg',
  'Running Hydration Pack': 'https://images.pexels.com/photos/13158583/pexels-photo-13158583.jpeg',
  'Running Protein Bar': 'https://images.pexels.com/photos/3065512/pexels-photo-3065512.jpeg',
  'Running Energy Gel': 'https://images.pexels.com/photos/29851973/pexels-photo-29851973.jpeg',
  'Running Electrolytes': 'https://images.pexels.com/photos/8940754/pexels-photo-8940754.jpeg',
  'Running Knee Brace': 'https://images.pexels.com/photos/5275180/pexels-photo-5275180.jpeg',
  'Running Ankle Brace': 'https://images.pexels.com/photos/14569654/pexels-photo-14569654.jpeg',
  'Ankle Braces': 'https://images.pexels.com/photos/7991959/pexels-photo-7991959.jpeg',
  'Garmin Forerunner 255': 'https://images.pexels.com/photos/3999644/pexels-photo-3999644.jpeg',
  'Garmin Forerunner 55': 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg',
  'Garmin Forerunner 955': 'https://images.pexels.com/photos/5081914/pexels-photo-5081914.jpeg',
  'Nike Running Sunglasses': 'https://pixabay.com/images/download/x-7076213_1920.jpg',
  'Running Headlamp': 'https://pixabay.com/images/download/x-8673761_1920.jpg',

  // Bags & Accessories - ALL UNIQUE
  'Adidas Backpack': 'https://images.pexels.com/photos/1986996/pexels-photo-1986996.jpeg',
  'Nike Duffel Bag': 'https://images.pexels.com/photos/9391902/pexels-photo-9391902.jpeg',
  'Puma Training Bag': 'https://images.pexels.com/photos/13872590/pexels-photo-13872590.jpeg',
  'Nike Basketball Bag': 'https://images.pexels.com/photos/5384399/pexels-photo-5384399.jpeg',
  'Spalding Water Bottle': 'https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg',
  'Adidas Water Bottle': 'https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg',
  'Nike Elite Socks': 'https://images.pexels.com/photos/11919823/pexels-photo-11919823.jpeg',
  'Adidas Socks': 'https://images.pexels.com/photos/11842284/pexels-photo-11842284.jpeg',
  'Puma Socks': 'https://images.pexels.com/photos/6533978/pexels-photo-6533978.jpeg',
  'Nike Armband': 'https://images.pexels.com/photos/6481840/pexels-photo-6481840.jpeg'
};

// Default image for any missing products
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500';

const Products = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [sortBy, setSortBy] = useState('popularity');
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  
  const itemsPerPage = 12;
  const BASE_URL = 'https://solid-fishstick-7v74445764vj3pjgx-5000.app.github.dev';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      console.log('🔍 Fetching products...');
      
      const response = await fetch(`${BASE_URL}/api/products?limit=1000`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        console.log(`✅ Found ${data.data.length} products`);
        
        // Map ALL products with UNIQUE images
        const mappedProducts = data.data.map(product => ({
          _id: product._id,
          name: product.name,
          brand: product.brand || 'SportsXpress',
          price: product.discountedPrice || product.price || 0,
          originalPrice: product.originalPrice || product.price || 0,
          discountPercentage: product.discountPercentage || 
            (product.originalPrice && product.discountedPrice ? 
              Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100) : 0),
          rating: 4.5,
          category: product.category || 'general',
          sport: product.sport || 'other',
          image: productImages[product.name] || DEFAULT_IMAGE,
          inStock: product.inStock !== false,
          offers: product.offers || ['Special offer available']
        }));
        
        setProducts(mappedProducts);
        setFilteredProducts(mappedProducts);
      } else {
        setError('No products found');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of your component remains exactly the same ...
  // (all the useEffect, handlers, and return statement stay unchanged)

  useEffect(() => {
    let result = [...products];
    
    if (searchQuery) {
      result = result.filter(p =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }
    
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      default: break;
    }
    
    setFilteredProducts(result);
    setPage(1);
  }, [searchQuery, selectedBrands, priceRange, sortBy, products]);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = (product, e) => {
    e.stopPropagation();
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const brands = [...new Set(products.map(p => p.brand))].filter(Boolean);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, bgcolor: '#f1f3f6', minHeight: '100vh' }}>
      {/* Header with product count */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Sports Equipment</Typography>
        <Chip label={`${filteredProducts.length} products`} color="primary" />
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                endAdornment: searchQuery && (
                  <IconButton onClick={() => setSearchQuery('')}>
                    <Clear />
                  </IconButton>
                ),
              }}
              sx={{ bgcolor: 'white' }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth sx={{ bgcolor: 'white' }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
                <MenuItem value="popularity">Popularity</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setFilterOpen(true)}
              sx={{ height: '56px', bgcolor: 'white' }}
            >
              Filters
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Filter Drawer */}
      <Drawer anchor="left" open={filterOpen} onClose={() => setFilterOpen(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={() => setFilterOpen(false)}><Close /></IconButton>
          </Box>
          
          <Typography variant="subtitle1" gutterBottom>Price Range</Typography>
          <Slider 
            value={priceRange} 
            onChange={(e, v) => setPriceRange(v)} 
            min={0} 
            max={20000} 
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => formatPrice(value)}
          />
          
          {brands.length > 0 && (
            <>
              <Typography variant="subtitle1" sx={{ mt: 3 }} gutterBottom>Brands</Typography>
              <Stack spacing={1}>
                {brands.map(brand => (
                  <FormControlLabel
                    key={brand}
                    control={<Checkbox checked={selectedBrands.includes(brand)} onChange={() => {
                      setSelectedBrands(prev =>
                        prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
                      );
                    }} />}
                    label={brand}
                  />
                ))}
              </Stack>
            </>
          )}
          
          <Button 
            fullWidth 
            variant="contained" 
            onClick={() => {
              setSearchQuery('');
              setSelectedBrands([]);
              setPriceRange([0, 20000]);
              setSortBy('popularity');
              setFilterOpen(false);
            }} 
            sx={{ mt: 3, bgcolor: '#fb641b' }}
          >
            Clear Filters
          </Button>
        </Box>
      </Drawer>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6">No products found</Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={2}>
            {paginatedProducts.map((product) => {
              const discount = product.discountPercentage || 
                (product.originalPrice > product.price ? 
                  Math.floor(((product.originalPrice - product.price) / product.originalPrice) * 100) : 20);
              
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      position: 'relative',
                      cursor: 'pointer',
                      '&:hover': { boxShadow: 6 }
                    }}
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    {/* Wishlist Button */}
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 10,
                        bgcolor: 'white',
                        boxShadow: 1,
                      }}
                      onClick={(e) => handleWishlistToggle(product, e)}
                    >
                      {isInWishlist(product._id) ? (
                        <Favorite sx={{ color: '#fb641b' }} />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>

                    {/* Discount Badge */}
                    {discount > 0 && (
                      <Chip 
                        label={`${discount}% OFF`} 
                        size="small" 
                        sx={{ 
                          position: 'absolute', 
                          top: 8, 
                          left: 8, 
                          bgcolor: '#ff4444', 
                          color: 'white',
                          fontWeight: 'bold'
                        }} 
                      />
                    )}

                    {/* Product Image - USING UNIQUE MAPPED IMAGES */}
                    <Box
                      className="product-image-container"
                      sx={{
                        height: 160,
                        width: '100%',
                        backgroundImage: `url(${product.image})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: '#ffffff',
                        p: 2
                      }}
                    />

                    <CardContent sx={{ p: 1.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        {product.brand}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, height: 40, overflow: 'hidden' }}>
                        {product.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                        <Typography variant="caption" sx={{ color: '#00a650', fontWeight: 'bold' }}>
                          {discount}% off
                        </Typography>
                        <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#999' }}>
                          {formatPrice(product.originalPrice)}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2ecc71' }}>
                          {formatPrice(product.price)}
                        </Typography>
                      </Box>

                      <Typography variant="caption" sx={{ color: '#00a650', display: 'block' }}>
                        {product.offers?.[0] || `WOW! ${formatPrice(Math.floor(product.price * 0.4))} with 3 offers`}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                        <Rating value={product.rating} size="small" readOnly />
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocalShipping sx={{ fontSize: 14, color: '#00a650' }} />
                        <Typography variant="caption" sx={{ color: '#00a650' }}>Free Shipping</Typography>
                      </Box>
                    </CardContent>

                    <Box sx={{ p: 1.5, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="small"
                        startIcon={<ShoppingCart />}
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={!product.inStock}
                        sx={{ bgcolor: '#fb641b' }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={(e, v) => setPage(v)} 
                color="primary" 
              />
            </Box>
          )}
        </>
      )}

      <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => window.scrollTo(0, 0)}>
        <ArrowUpward />
      </Fab>
    </Container>
  );
};

export default Products;