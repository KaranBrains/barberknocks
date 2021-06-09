import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { contactUs } from "../../redux/actions/contact";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";

function Contact() {
  const initialState = { name: "", email: "", message: "" };
  const [formData, setformData] = useState(initialState);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(contactUs(formData, router));
  };
  return (
    <>
      <div className="container my-5 bg-primaryColor py-5">
        <h1 className="font-bold text-tertiaryColor text-center pt-5">
          Get in Touch
        </h1>
        <div className="text-tertiaryColor text-center font-medium font-15 mt-2">
          How can we help you out? If you fill out the form below, we will try
          to get back to you ASAP!
        </div>
        <p className="text-tertiaryColor text-center font-14">
          <i>Fields marked with an asterisk (*) are required.</i>
        </p>
        <div className="d-flex justify-content-center">
          <div className="text-tertiaryColor text-center font-medium font-25 mt-4 px-lg-3 px-3">
            <PhoneIcon fontSize="large" />
            <a href="tel:+91-8077265082">
              <p className="font-16 text-tertiaryColor text-center font-medium mt-2">
                +91-9876543210
              </p>
            </a>
          </div>
          <div className="text-tertiaryColor text-center font-medium font-25 mt-4 px-lg-3">
            <MailIcon fontSize="large" />
            <a href="mailto:karanbains@gamil.com">
              <p className="font-16 text-tertiaryColor text-center font-medium mt-2">
                karanbains@gamil.com
              </p>
            </a>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 col-md-8 col-sm-12 col-12 my-5">
            <div className="bg-tertiaryColor rounded py-5 px-lg-5 px-3">
              <form>
                <div className="d-flex justify-content-between">
                  <div className="w-50" style={{ marginRight: "20px" }}>
                    <div className="input-group mt-4">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={(e) => {
                          setformData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        required
                        placeholder="Name (*)"
                      />
                    </div>
                    <div className="input-group mt-4">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={(e) => {
                          setformData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        placeholder="Email (*)"
                      />
                    </div>
                  </div>
                  <div className="input-group mt-4 w-50">
                    <textarea
                      type="text"
                      className="form-control"
                      name="message"
                      value={formData.message}
                      onChange={(e) => {
                        setformData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      placeholder="Message (*)"
                      rows="4"
                    ></textarea>
                  </div>
                </div>
                <div className="text-center mt-5">
                  <button
                    className="text-white bg-secondaryColor font-demi btn-blue submit-button"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
