import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import SuccessModal from "../components/Modal/SuccessModal";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    celular: "",
    email: "",
    cep: "",
    endereco: "",
    cidade: "",
    estado: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.cart) {
      setCart(location.state.cart);
    } else {
      const savedCart = localStorage.getItem("movieCart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, [location.state]);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("movieCart", JSON.stringify(updatedCart));
  };

  const applyMask = (value, type) => {
    switch (type) {
      case "cpf":
        return value
          .replace(/\D/g, "")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})/, "$1-$2")
          .replace(/(-\d{2})\d+?$/, "$1");

      case "celular":
        return value
          .replace(/\D/g, "")
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{5})(\d)/, "$1-$2")
          .replace(/(-\d{4})\d+?$/, "$1");

      case "cep":
        return value
          .replace(/\D/g, "")
          .replace(/(\d{5})(\d)/, "$1-$2")
          .replace(/(-\d{3})\d+?$/, "$1");

      default:
        return value;
    }
  };

  function isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  }

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "nomeCompleto":
        if (!value.trim()) {
          newErrors.nomeCompleto = "Nome completo é obrigatório";
        } else if (value.trim().split(" ").length < 2) {
          newErrors.nomeCompleto = "Digite nome e sobrenome";
        } else {
          delete newErrors.nomeCompleto;
        }
        break;

      case "cpf":
        const cpfClean = value.replace(/\D/g, "");
        if (!value) {
          newErrors.cpf = "CPF é obrigatório";
        } else if (!isValidCPF(cpfClean)) {
          newErrors.cpf = "CPF inválido";
        } else {
          delete newErrors.cpf;
        }
        break;

      case "celular":
        const celularClean = value.replace(/\D/g, "");
        if (!value) {
          newErrors.celular = "Celular é obrigatório";
        } else if (celularClean.length !== 11) {
          newErrors.celular = "Celular deve ter 11 dígitos";
        } else {
          delete newErrors.celular;
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          newErrors.email = "E-mail é obrigatório";
        } else if (!emailRegex.test(value)) {
          newErrors.email = "E-mail inválido";
        } else {
          delete newErrors.email;
        }
        break;

      case "cep":
        const cepClean = value.replace(/\D/g, "");
        if (!value) {
          newErrors.cep = "CEP é obrigatório";
        } else if (cepClean.length !== 8) {
          newErrors.cep = "CEP deve ter 8 dígitos";
        } else {
          delete newErrors.cep;
        }
        break;

      case "endereco":
        if (!value.trim()) {
          newErrors.endereco = "Endereço é obrigatório";
        } else {
          delete newErrors.endereco;
        }
        break;

      case "cidade":
        if (!value.trim()) {
          newErrors.cidade = "Cidade é obrigatória";
        } else {
          delete newErrors.cidade;
        }
        break;

      case "estado":
        if (!value.trim()) {
          newErrors.estado = "Estado é obrigatório";
        } else {
          delete newErrors.estado;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cpf" || name === "celular" || name === "cep") {
      formattedValue = applyMask(value, name);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    if (touched[name]) {
      validateField(name, formattedValue);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const isFormValid = () => {
    return Object.keys(formData).every(
      (key) => formData[key].trim() !== "" && !errors[key]
    );
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allTouched = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
    });

    if (isFormValid() && cart.length > 0) {
      setCart([]);
      localStorage.removeItem("movieCart");

      setShowSuccessModal(true);
    } else if (cart.length === 0) {
      alert(
        "Seu carrinho está vazio. Adicione itens antes de finalizar a compra."
      );
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      <header>
        <Header cartCount={cartCount} />
      </header>

      <main className="flex flex-1 px-4 md:px-12 py-6 md:py-10 gap-8 md:gap-16 flex-col md:flex-row">
        <section className="flex-1">
          <h2 className="text-2xl font-semibold mb-8">Finalizar Compra</h2>

          <CheckoutForm
            formData={formData}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </section>

        <section className="w-full md:w-[420px]">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Resumo do Pedido</h3>

            <OrderSummary
              cart={cart}
              total={total}
              onRemoveItem={removeItem}
              onCheckout={handleSubmit}
              isFormValid={isFormValid() && cart.length > 0}
              onNavigateHome={() => navigate("/")}
            />
          </div>
        </section>
      </main>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        userName={formData.nomeCompleto.split(" ")[0]}
      />
    </div>
  );
}
