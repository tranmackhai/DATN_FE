import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "../components/layouts/DefaultLayout";
import Register from "../pages/Register";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Login";
import About from "../pages/About/About";
import News from "../pages/News";
import UniversityTrainning from "../pages/Trainning/UniversityTrainning/UniversityTrainning";
import GraduateTrainning from "../pages/Trainning/GraduateTrainning/GraduateTrainning";
import Trainning from "../pages/Trainning/Trainning";
import NewsLayout from "../components/layouts/NewsLayout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <HomePage />
            </DefaultLayout>
          }
        />
        <Route
          path="/dangky"
          element={
            <DefaultLayout>
              <Register />
            </DefaultLayout>
          }
        />
        <Route
          path="/dangnhap"
          element={
            <DefaultLayout>
              <Login />
            </DefaultLayout>
          }
        />
        <Route
          path="/gioithieu"
          element={
            <DefaultLayout>
              <About />
            </DefaultLayout>
          }
        />
        <Route
          path="/tintuc"
          element={
            <NewsLayout>
              <News />
            </NewsLayout>
          }
        />
        <Route
          path="/daotao"
          element={
            <DefaultLayout>
              <Trainning />
            </DefaultLayout>
          }
        />
        <Route
          path="/dao-tao-dai-hoc"
          element={
            <NewsLayout sidebar={true}>
              <UniversityTrainning/>
            </NewsLayout>
          }
        />
        <Route
          path="/dao-tao-sau-dai-hoc"
          element={
            <NewsLayout sidebar={true}>
              <GraduateTrainning />
            </NewsLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
