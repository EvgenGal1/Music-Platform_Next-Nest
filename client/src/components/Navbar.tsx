"use client";

import React from "react";
// логика,Комп.Next
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// Комп.MaterialUI
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import AlbumIcon from "@mui/icons-material/Album";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
// ^^ доп.иконки - https://v4.mui.com/ru/components/material-icons/
// import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
// import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

// ^ ГОРИЗОНТАЛЬНОЕ МЕНЮ
// интерф.горизонт.меню(stl/лог.)
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
// горизонт.меню(stl/лог.)
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  // ^^ свои stl
  color: "#c2c2c2",
  backgroundColor: "#252850",
}));

// ^ ВЕРТИКАЛЬНОЕ МЕНЮ
// ширина вертик.меню
const drawerWidth = 175;
// масс.верх.эл/путей вертик.меню
const menuVerticalTopItems = [
  { text: "Главная", href: "/" },
  { text: "Закачать", href: "/download" },
  { text: "Треки", href: "/tracks" },
  { text: "Альбомы", href: "/albums" },
  { text: "Плейлисты", href: "/playlists" },
];
// вертикал.меню(stl/лог.)
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  // ^^ свои stl
  "& > div": { backgroundColor: "#003366" },
}));
// область/иконка закр.вертик.меню
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // необходимо, чтобы контент был ниже панели приложений
  ...theme.mixins.toolbar,
}));
// stl.откр.вертик.м.
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
// stl.закр.верик.м.
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
// интерф./объ.соответствий иконок верт.м.
interface IconMap {
  [key: string]: JSX.Element;
}
// объ.соответствий
const iconMap: IconMap = {
  Почта: <MailIcon />,
  Корзина: <ShoppingCartIcon />,
  ЛК: <PersonIcon />,
};

// ^^ свои stl.
// наведение
const hoverStyle = {
  "&:hover, &:hover > div > svg": {
    color: "#f3a505",
    transition: "color 0.3s ease",
  },
};
const styles = {
  // назв.сайта
  typographyStyle: {
    fontSize: "inherit",
    fontFamily: "inherit",
    lineHeight: 1,
    ...hoverStyle,
  },
};

export default function Navbar() {
  // сост.откр.вертик.меню
  const [open, setOpen] = React.useState(false);
  // хук темы MUI
  const theme = useTheme();
  // хук навигации NextJS
  const router = useRouter();

  // опред.актив.ссылок > .active
  const pathname = usePathname();

  // откр.вертик.меню
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  // закр.вертик.меню
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      {/* header. горизонт.меню */}
      <AppBar position="fixed" open={open} className="menu-horizon">
        {/* общ.div эл.в header */}
        <Toolbar>
          {/* иконка откр.вертик.меню */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...hoverStyle,
              ...(open && { display: "none" }),
            }}
            data-open={open ? "true" : "false"}
          >
            <MenuIcon />
          </IconButton>
          {/* название сайта */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            // style={styles.typographyStyle} // inline stl react без поддержки псевдо-классов
            sx={styles.typographyStyle} // объ.stl MIU c поддержкой псевдо-классов
          >
            Музыкальная платформа
          </Typography>
          {/* страницы */}
          <nav className={`header-nav flex ml-auto`}>
            {/* stl.Next */}
            <Link
              className={`link ${pathname === "/" ? "active" : ""}`}
              href="/"
            >
              <span>Home</span>
            </Link>
            <Link
              className={`link ${pathname === "/examples" ? "active" : ""}`}
              href="/examples"
            >
              <span>Exempl</span>
            </Link>
            <Link
              className={`link ${pathname === "/blog" ? "active" : ""}`}
              href="/blog"
            >
              <span>Blog</span>
            </Link>
            <Link
              className={`link ${
                // ? раб.ток.на первый путь
                pathname === ("/about" || "/about/team" || "/about/contacts")
                  ? "active"
                  : ""
              }`}
              href="/about"
            >
              <span>About</span>
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
      {/* вертикальное меню */}
      <Drawer variant="permanent" open={open} className="menu-vertical">
        {/* иконка закр.вертик.меню */}
        <DrawerHeader>
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              ...hoverStyle,
            }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        {/* черта */}
        <Divider />
        {/* 1ый ul лист вертик.меню */}
        <List>
          {/* масс.эл.li */}
          {/* // ^ отрисовка ч/з встроеный масс. (запись, аудио, скачать) */}
          {/* {["Закачать", "Треки", "Альбомы", "Плейлисты"].map((text, index) => */}
          {/* // ^ отрисовка ч/з перем.масс. */}
          {menuVerticalTopItems.map(({ text, href }, index) => (
            // li
            <ListItem
              key={href}
              onClick={() => router.push(href)}
              disablePadding
              sx={{ display: "block" }}
              className={`link ${pathname === href ? "active" : ""}`}
            >
              {/* общ.div иконки/текста */}
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  ...hoverStyle,
                }}
              >
                {/* div иконки */}
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "black",
                  }}
                >
                  {/* svg иконки */}
                  {/* подход > 2х чёт не чёт */}
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  {/* подход > неск.услов.опер.index */}
                  {index === 0 ? (
                    <InboxIcon />
                  ) : index === 1 ? (
                    <CloudDownloadIcon />
                  ) : index === 2 ? (
                    <AudiotrackIcon />
                  ) : index === 3 ? (
                    <AlbumIcon />
                  ) : (
                    <PlaylistPlayIcon />
                  )}
                </ListItemIcon>
                {/* текст */}
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* черта */}
        <Divider />
        {/* 2ой ul лист вертик.меню */}
        <List>
          {["Почта", "Корзина", "ЛК"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  ...hoverStyle,
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "black",
                  }}
                >
                  {/* подход ч/з объ.соответствий */}
                  {iconMap[text]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
