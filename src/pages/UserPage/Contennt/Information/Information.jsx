import { useTheme } from "@emotion/react";
import {
  Box,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import accountApi from "../../../../api/modules/account.api";
import provinces from "../../../../json/province.json";
import { setAccount } from "../../../../redux/features/accountSlice";
import { ToastContainer, toast } from "react-toastify";

const sex = [
  {
    label: "Nam",
    value: true,
  },
  {
    label: "Nữ",
    value: false,
  },
];

const Information = () => {
  const informationForm = useFormik({
    initialValues: {
      name: "",
      gmail: "",
      phone: "",
      sex: true,
      birthday: dayjs("2001-01-01"),
      address: "",
      province: "Thành phố Hồ Chí Minh",
      district: "",
      ward: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(4, "Họ và tên tối thiểu 4 ký tự ")
        .required("Bạn phải nhập tên"),
      phone: Yup.string()
        .min(10, "Số điện thoại không hợp lệ")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
          "Số điện thoại không hợp lệ"
        )
        .required("Bạn phải nhập số điện thoại"),
      province: Yup.string().required("Vui lòng chọn Tỉnh thành"),
      district: Yup.string().required("Vui lòng chọn Quận huyện"),
      ward: Yup.string().required("Vui lòng chọn Phường-Xã"),
      address: Yup.string().required("Vui lòng nhập số nhà, tên đường"),
      // birthday: Yup.date()
      //   .max(new Date(Date.now() - 567648000000), "Bạn phải đủ 18 tuổi")
      //   .required("Chọn ngày sinh"),
    }),
    onSubmit: async (values) => {
      // console.log({ ...values, role });
      try {
        const respone = await accountApi.changeProfile({
          ...values,
          birthday: new Date(values.birthday.format("YYYY-MM-DDTHH:mm:ss")),
        });
        if (respone.response.status === 200) {
          setProfile(respone.response.data);
          toast.success("Lưu thông tin thành công");
          dispatch(setAccount({ user: respone.response.data }));
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  // console.log(informationForm.values);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [districts, setDistricts] = useState([]);
  const [profile, setProfile] = useState();
  const [wards, setWards] = useState([]);
  const handleChangeProvinces = (e) => {
    const value = e.target.value;
    const province = provinces.find((item) => item.name === value);
    console.log(province, value);
    informationForm.setFieldValue("province", value);
    if (province) {
      setDistricts(province.districts);
    }
  };
  const handleChangeDistricts = (e) => {
    const value = e.target.value;
    informationForm.setFieldValue("district", value);
    const district = districts.find((item) => item.name === value);
    if (district) {
      setWards(district.wards);
    }
  };
  const handleCancel = () => {
    informationForm.setFieldValue("name", profile.name);
    informationForm.setFieldValue("gmail", profile.gmail);
    informationForm.setFieldValue("phone", profile.phone);
    informationForm.setFieldValue("birthday", dayjs(profile.birthday));
    informationForm.setFieldValue("sex", profile.sex);
    informationForm.setFieldValue("address", profile.address);
    informationForm.setFieldValue("province", profile.province);
    informationForm.setFieldValue("district", profile.district);
    informationForm.setFieldValue("ward", profile.ward);
    const province = provinces.find((item) => item.name === profile.province);
    if (province) {
      setDistricts(province.districts);
      const district = province.districts.find(
        (item) => item.name === profile.district
      );
      if (district) {
        setWards(district.wards);
      }
    }
  };

  useEffect(() => {
    const fetchData = async (values) => {
      try {
        const response = await accountApi.getProfile({ ...values });
        // console.log(response.response.data);
        informationForm.setFieldValue("name", response.response.data.name);
        informationForm.setFieldValue("gmail", response.response.data.gmail);
        informationForm.setFieldValue("phone", response.response.data.phone);
        informationForm.setFieldValue(
          "birthday",
          dayjs(response.response.data.birthday)
        );
        informationForm.setFieldValue("sex", response.response.data.sex);
        informationForm.setFieldValue(
          "address",
          response.response.data.address
        );
        informationForm.setFieldValue(
          "province",
          response.response.data.province
        );
        informationForm.setFieldValue(
          "district",
          response.response.data.district
        );
        informationForm.setFieldValue("ward", response.response.data.ward);
        setProfile(response.response.data);
        const province = provinces.find(
          (item) => item.name === response.response.data.province
        );
        if (province) {
          setDistricts(province.districts);
          const district = province.districts.find(
            (item) => item.name === response.response.data.district
          );
          if (district) {
            setWards(district.wards);
          }
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <section className="information">
      <ToastContainer />
      <Box
        component="form"
        onSubmit={informationForm.handleSubmit}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "4px",
          padding: "20px",
        }}
      >
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                type="text"
                placeholder="Nhập họ và tên"
                name="name"
                fullWidth
                value={informationForm.values.name}
                onChange={informationForm.handleChange}
                color="success"
                error={
                  informationForm.touched.name &&
                  informationForm.errors.name !== undefined
                }
                helperText={
                  informationForm.touched.name && informationForm.errors.name
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                placeholder="Gmail"
                name="gmail"
                disabled={true}
                value={informationForm.values.gmail}
                onChange={informationForm.handleChange}
                color="success"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                placeholder="Nhập số điện thoại"
                name="phone"
                value={informationForm.values.phone}
                onChange={informationForm.handleChange}
                color="success"
                fullWidth
                error={
                  informationForm.touched.phone &&
                  informationForm.errors.phone !== undefined
                }
                helperText={
                  informationForm.touched.phone && informationForm.errors.phone
                }
              />
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                ".MuiStack-root": {
                  paddingTop: "0 !important",
                },
              }}
            >
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                className="saomaynguthe"
              >
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <DatePicker
                    // label="Ngày sinh"
                    value={informationForm.values.birthday}
                    format="DD/MM/YYYY"
                    onChange={(newValue) =>
                      informationForm.setFieldValue("birthday", newValue)
                    }
                    sx={{ width: "100%" }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                placeholder="Địa chỉ"
                name="address"
                value={informationForm.values.address}
                onChange={informationForm.handleChange}
                color="success"
                error={
                  informationForm.touched.address &&
                  informationForm.errors.address !== undefined
                }
                helperText={
                  informationForm.touched.address &&
                  informationForm.errors.address
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                fullWidth
                name="province"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                variant="outlined"
                value={informationForm.values.province}
                onChange={handleChangeProvinces}
              >
                {provinces.map((item, index) => {
                  return (
                    <MenuItem value={item.name} key={index}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <Select
                fullWidth
                name="district"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                variant="outlined"
                value={informationForm.values.district}
                onChange={handleChangeDistricts}
              >
                {districts.map((item, index) => {
                  return (
                    <MenuItem value={item.name} key={index}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <Select
                fullWidth
                name="ward"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                variant="outlined"
                value={informationForm.values.ward}
                onChange={informationForm.handleChange}
              >
                {wards.map((item, index) => {
                  return (
                    <MenuItem value={item.name} key={index}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{ fontWeight: 500, fontSize: "1rem", marginBottom: "12px" }}
              >
                Giới tính
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  span: {
                    display: "block",
                    textAlign: "center",
                    margin: "0 4px",
                    fontSize: "1rem",
                    width: "140px",
                    padding: "8px 0",
                    borderRadius: "6px",
                    cursor: "pointer",
                    backgroundColor: "#f8f8f8",
                  },
                }}
              >
                {sex.map((item) => {
                  return (
                    <span
                      key={item.value}
                      style={
                        item.value === informationForm.values.sex
                          ? {
                              border: "1px solid #fcaf17",
                              backgroundColor: "#fff",
                            }
                          : {}
                      }
                      onClick={() => {
                        informationForm.setFieldValue("sex", item.value);
                      }}
                    >
                      {item.label}
                    </span>
                  );
                })}
              </Box>
              <p
                className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled css-1wc848c-MuiFormHelperText-root"
                style={{ textAlign: "center" }}
              >
                {informationForm.touched.role && informationForm.errors.role}
              </p>
            </Grid>
          </Grid>
          <Box display="flex" paddingBottom="24px" justifyContent="right">
            <button
              type="submit"
              style={{
                width: "120px",
                padding: "10px 0",
                borderRadius: "4px",
                outline: "none",
                cursor: "pointer",
                backgroundColor: "#fcaf17",
                color: theme.palette.secondary.contrastText,
                fontWeight: "600",
                border: "none",
                textTransform: "uppercase",
                marginRight: "12px",
              }}
              // onClick={() => {
              //   handleSubmit();
              // }}
            >
              Lưu
            </button>
            <button
              type="button"
              style={{
                width: "120px",
                padding: "10px 0",
                borderRadius: "4px",
                outline: "none",
                cursor: "pointer",
                backgroundColor: "rgb(174 167 167)",
                color: theme.palette.secondary.contrastText,
                fontWeight: "600",
                border: "none",
                textTransform: "uppercase",
              }}
              onClick={() => {
                handleCancel();
              }}
            >
              Huỷ
            </button>
          </Box>
        </Container>
      </Box>
    </section>
  );
};

export default Information;
