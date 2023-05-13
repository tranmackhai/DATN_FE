import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "../components/layouts/DefaultLayout";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import About from "../pages/About/About";
import UniversityTrainning from "../pages/Trainning/UniversityTrainning/UniversityTrainning";
import GraduateTrainning from "../pages/Trainning/GraduateTrainning/GraduateTrainning";
import Trainning from "../pages/Trainning/Trainning";
import NewsLayout from "../components/layouts/NewsLayout";
import ScientificResearch from "../pages/ScientificResearch/ScientificResearch";
import ScientificResearchDetail from "../pages/ScientificResearch/ScientificResearchDetail";
import News from "../pages/News/News";
import NewsDetail from "../pages/News/NewsDetail";
import Recruitment from "../pages/Recruitment/Recruitment";
import RecruitmentDetail from "../pages/Recruitment/RecruitmentDetail";

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
              <UniversityTrainning />
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
        <Route
          path="/nckh"
          element={
            <NewsLayout sidebar={true}>
              <ScientificResearch />
            </NewsLayout>
          }
        />
        <Route
          path="/nckh/:slug"
          element={
            <NewsLayout sidebar={true}>
              <ScientificResearchDetail />
            </NewsLayout>
          }
        />
        <Route
          path="/tintuc"
          element={
            <NewsLayout sidebar={true}>
              <News />
            </NewsLayout>
          }
        />
        <Route
          path="/tuyendung"
          element={
            <NewsLayout sidebar={true}>
              <Recruitment />
            </NewsLayout>
          }
        />
        <Route
          path="/tintuc/:slug"
          element={
            <NewsLayout sidebar={true}>
              <NewsDetail />
            </NewsLayout>
          }
        />
        <Route
          path="/tuyendung/:slug"
          element={
            <NewsLayout sidebar={true}>
              <RecruitmentDetail />
            </NewsLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
