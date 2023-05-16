import { Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { isAuthenticated, privateRoutes, publicRoutes } from "router";
import Layout from "scenes/layout";




function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo((state) => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          {!isAuthenticated() ? (
            <>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/dashboard" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <Route element={<Layout />}>
              {privateRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                  exact={route.exact}
                />
              ))}
            </Route>
          )}
          <Route>
            {publicRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
                exact={route.exact}
              />
            ))}
          </Route>

        </Routes>
      </ThemeProvider>

    </div >
  );
}

export default App;
