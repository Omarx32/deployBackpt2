const { Property } = require("../../db");

const PropertyAdmin = async (req, res) => {
  const productId = req.params.id;
  const { isPublished } = req.body; // Puedes enviar esta información en el cuerpo de la solicitud
  try {
    const product = await Property.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }
    product.isPublished = isPublished; // Actualizar el estado de la publicación
    await product.save();
    return res.json({ message: "Estado de publicación actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar el estado de publicación:", error);
    return res
      .status(500)
      .json({ message: "Error al actualizar el estado de publicación" });
  }
};

module.exports = { PropertyAdmin };