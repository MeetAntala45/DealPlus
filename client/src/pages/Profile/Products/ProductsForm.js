import { Col, Form, Input, Row, Tabs, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import Modal from "antd/es/modal/Modal";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/LoadersSlice";
import { AddProduct, EditProduct } from "../../../Apicalls/products";
import Images from "./Images";

const AddtionalThings = [
  {
    label: "Bill Available",
    name: "billAvailable",
  },
  {
    label: "Warranty Available",
    name: "warrantyAvailable",
  },
  {
    label: "Accessories Available",
    name: "accessoriesAvailable",
  },
  {
    label: "Box Available",
    name: "boxAvailable",
  },
  {
    label: "Product Damage",
    name: "productdamage",
  },
  {
    label: "First Owner",
    name: "firstowner",
  },
  {
    label: "Scratches on product",
    name: "scratches",
  },
];

const rules = [
  {
    required: true,
    message: "Required field",
  },
];

const ProductsForm = ({
  showProductForm,
  setshowProductForm,
  selectedProduct,
  getData,
}) => {
  const [selectedTab = "1", setselectedTab] = useState("1");
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const { user } = useSelector((state) => state.users);

  const onFinish = async (value) => {
    try {
      dispatch(SetLoader(true));
      let response = null;
      if (selectedProduct) {
        response = await EditProduct(selectedProduct._id, value);
      } else {
        value.seller = user._id;
        value.status = "pending";
        response = await AddProduct(value);
      }
      if (response.success) {
        message.success(response.message);
        getData();
        dispatch(SetLoader(false));
        setshowProductForm(false);
      } else {
        dispatch(SetLoader(false));
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);

  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setshowProductForm(false)}
      centered={true}
      width={900}
      okText="Save"
      onOk={() => {
        formRef.current.submit();
      }}
      {...(selectedTab === "2" && { footer: false })}
    >
      <div>
        <h1 className="text-primary text-center uppercase text-2xl">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h1>
        <Tabs
          defaultActiveKey="1"
          activeKey={selectedTab}
          onChange={(key) => setselectedTab(key)}
        >
          <Tabs.TabPane tab="General" key={1}>
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
              <Form.Item label="Name" name="name" rules={rules}>
                <Input type="text"></Input>
              </Form.Item>

              <Form.Item label="Description" name="description" rules={rules}>
                <TextArea type="text"></TextArea>
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type="number"></Input>
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item label="Category" name="category" rules={rules}>
                    <select name="" id="" className="rounded-xl">
                      <option value="">Select</option>
                      <option value="electronic">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="home">Home</option>
                      <option value="sport">Sports</option>
                      <option value="book">Books</option>
                      <option value="other">Other</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Age" name="age" rules={rules}>
                    <Input type="number"></Input>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Years" name="monYears" rules={rules}>
                    <select name="" id="" className="rounded-xl">
                      <option value="years">Years</option>
                    </select>
                  </Form.Item>
                </Col>
              </Row>

              <div className="flex gap-5">
                {AddtionalThings.map((item, index) => {
                  return (
                    <Form.Item
                      label={item.label}
                      name={item.name}
                      valuePropName="checked"
                    >
                      <Input
                        type="checkbox"
                        value={item.name}
                        onChange={(e) => {
                          formRef.current.setFieldsValue({
                            [item.name]: e.target.checked,
                          });
                        }}
                        checked={formRef.current?.getFieldValue(item.name)}
                      ></Input>
                    </Form.Item>
                  );
                })}
              </div>

              <Row>
                <Col span={8}>
                  <Form.Item
                    label="show Bids on product Page"
                    name="showBidsProductPage"
                    valuePropName="checked"
                  >
                    <Input
                      type="checkbox"
                      onChange={(e) => {
                        formRef.current.setFieldsValue({
                          showBidsProductPage: e.target.checked,
                        });
                      }}
                      checked={formRef.current?.getFieldValue(
                        "showBidsProductPage"
                      )}
                      style={{width: 50,marginLeft:15}}
                    ></Input>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Images"
            key="2"
            disabled={!selectedProduct}
            setselectedTab={"2"}
          >
            <Images
              selectedProduct={selectedProduct}
              getData={getData}
              setshowProductForm={setshowProductForm}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
};

export default ProductsForm;