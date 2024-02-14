'use client'

import { useEffect } from 'react';
import { jsPDF } from 'jspdf';

const ComparativePDF = ({ products }) => {
  useEffect(() => {
    const makeComparativePDF = () => {
      const doc = new jsPDF();

      // Creamos una tabla para mostrar los nombres y precios de los productos
      let yPos = 10;
      products.forEach((product, index) => {
        doc.text(product.title + ' - $' + product.price, 10, yPos);
        yPos += 10; // Ajusta la posición vertical para cada producto
      });

      // Guardamos el documento PDF
      doc.save('comparativa.pdf');
    };

    makeComparativePDF();
  }, [products]);

  return null; // Este componente no renderiza nada en la interfaz
};

export default ComparativePDF;
