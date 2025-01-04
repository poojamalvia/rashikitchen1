import React from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { InputAdornment } from "@mui/material";
let redcolor = "#FF1B1C";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogTitle-root": {
    padding: theme.spacing(3),
    fontSize: "1.5rem",
    fontWeight: 600,
    textAlign: "center",
    color: theme.palette.primary.main,
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
    justifyContent: "center",
  },
  "& .MuiButtonGroup-root": {
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(1),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  textTransform: "none",
  padding: theme.spacing(1.5),
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
}));

function Cart({}) {
  const [cart, setCart] = React.useState([
    {
      name: "Samosa",
      Price: 5,
      img: `https://static.toiimg.com/thumb/61050397.cms?imgsize=246859&width=800&height=800`,
      desc: "It is delicious product made with milk and palm sugar decorated with cashews and almonds",
    },
    {
      name: "Chole Bhature",
      Price: 13.99,
      img: `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QCLRXhpZgAASUkqAAgAAAAEAA4BAgA1AAAAPgAAABIBAwABAAAAAQAAABoBBQABAAAAcwAAABsBBQABAAAAewAAAAAAAABWZWdhbiwgQ29jb251dCBNaWxrIFZhbmlsbGEgSWNlIENyZWFtIEluIGEgU3VnYXIgQ29uZSwBAAABAAAALAEAAAEAAAD/7QB6UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAF4cAlAADkxhdXJpUGF0dGVyc29uHAJ4ADVWZWdhbiwgQ29jb251dCBNaWxrIFZhbmlsbGEgSWNlIENyZWFtIEluIGEgU3VnYXIgQ29uZRwCbgAMR2V0dHkgSW1hZ2Vz/+EFMmh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+Cgk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6SXB0YzR4bXBDb3JlPSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wQ29yZS8xLjAveG1sbnMvIiAgIHhtbG5zOkdldHR5SW1hZ2VzR0lGVD0iaHR0cDovL3htcC5nZXR0eWltYWdlcy5jb20vZ2lmdC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBsdXM9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iICB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIiB4bWxuczp4bXBSaWdodHM9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9yaWdodHMvIiBwaG90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`,
      desc: "It is delicious product made with milk and palm sugar decorated with cashews and almonds",
    },
    {
      name: "Kadhi Pakora",
      Price: 10.99,
      img: `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QCLRXhpZgAASUkqAAgAAAAEAA4BAgA1AAAAPgAAABIBAwABAAAAAQAAABoBBQABAAAAcwAAABsBBQABAAAAewAAAAAAAABWZWdhbiwgQ29jb251dCBNaWxrIFZhbmlsbGEgSWNlIENyZWFtIEluIGEgU3VnYXIgQ29uZSwBAAABAAAALAEAAAEAAAD/7QB6UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAF4cAlAADkxhdXJpUGF0dGVyc29uHAJ4ADVWZWdhbiwgQ29jb251dCBNaWxrIFZhbmlsbGEgSWNlIENyZWFtIEluIGEgU3VnYXIgQ29uZRwCbgAMR2V0dHkgSW1hZ2Vz/+EFMmh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+Cgk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6SXB0YzR4bXBDb3JlPSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wQ29yZS8xLjAveG1sbnMvIiAgIHhtbG5zOkdldHR5SW1hZ2VzR0lGVD0iaHR0cDovL3htcC5nZXR0eWltYWdlcy5jb20vZ2lmdC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBsdXM9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iICB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIiB4bWxuczp4bXBSaWdodHM9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9yaWdodHMvIiBwaG90b3Nob3A6Q3JlZGl0PSJHZXR0eSBJbWFnZXMiIEdldHR5SW1hZ2VzR0lGVDpBc3NldElEPSIxMTYwMjUwNjk4IiB4bXBSaWdodHM6V2ViU3RhdGVtZW50PSJodHRwczovL3d3dy5nZXR0eWltYWdlcy5jb20vZXVsYT91dG1fbWVkaXVtPW9yZ2FuaWMmYW1wO3V0bV9zb3VyY2U9Z29vZ2xlJmFtcDt1dG1fY2FtcGFpZ249aXB0Y3VybCIgPgo8ZGM6Y3JlYXRvcj48cmRmOlNlcT48cmRmOmxpPkxhdXJpUGF0dGVyc29uPC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5WZWdhbiwgQ29jb251dCBNaWxrIFZhbmlsbGEgSWNlIENyZWFtIEluIGEgU3VnYXIgQ29uZTwvcmRmOmxpPjwvcmRmOkFsdD48L2RjOmRlc2NyaXB0aW9uPgo8cGx1czpMaWNlbnNvcj48cmRmOlNlcT48cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz48cGx1czpMaWNlbnNvclVSTD5odHRwczovL3d3dy5nZXR0eWltYWdlcy5jb20vZGV0YWlsLzExNjAyNTA2OTg/dXRtX21lZGl1bT1vcmdhbmljJmFtcDt1dG1fc291cmNlPWdvb2dsZSZhbXA7dXRtX2NhbXBhaWduPWlwdGN1cmw8L3BsdXM6TGljZW5zb3JVUkw+PC9yZGY6bGk+PC9yZGY6U2VxPjwvcGx1czpMaWNlbnNvcj4KCQk8L3JkZjpEZXNjcmlwdGlvbj4KCTwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InciPz4K/9sAhAAJBgcIBwYJCAcICgoJCw0WDw0MDA0bFBUQFiAdIiIgHR8fJCg0LCQmMScfHy09LTE1Nzo6OiMrP0Q/OEM0OTo3AQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCACWAMgDASIAAhEBAxEB/8QAHAAAAQUBAQEAAAAAAAAAAAAAAwACBAUGAQcI/8QANxAAAgEDAwIFAgQEBQUAAAAAAQIDAAQRBRIhMUEGEyJRYRRxMoGRwSNCobEHUmLR4RUkU4Lw/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAMBAgQFBv/EACQRAAICAgIBBAMBAAAAAAAAAAABAhEDIRIxBCIyQVEFE3Ej/9oADAMBAAIRAxEAPwD1tjQzTs80sZqpYGeRQymaORimNQAxVxRFbBoROOtdXBoAloQacQKCh208uMVBAjQ3bFcZ/akI2k+B70AN8zigs5zUhoABgDJPUmuGCJRyCfzosAKvzR05qO0tqkojJYN79v1/KjxvGJPKLgMOxoUkwoLTTTxg9ORTWFWAYRXMU41w0ANLYphkp+zdXTDxQAAynNIkkU5owDTSpFSAzkUOR2WpSrkc0hCrUARElOec0qkvCqilUAFJ5pb8VzaabjBoJHbzSL8U2uEVAA3b5rqNiutETXAAnWpAL5nFcTdI+1aA8o7VOsY9se8j1N/aoAKkSp25pxNJmoQmiZzGrqXA3EZ7VAHSaGCzZ3YHtg13hj74pE9zVQKyXTpZnIeYlftmiS2KxqolnJcoCrFepo0z8E5A+TUS4djHtaQFR2pfFJ2Xts7BfSQZjdt6DvU+KeO4TdE2feqGSRfJYAEZIAJNMt7poZFdDx3HuKupEOJocHNcJOcUyKYSIHQ5UjIoikUwqPBIrhk4pw5pjIKAI7SndR0Adajyrg0SGQAYqQHuMDimI5BxTy4NNHXipIHMcjmlTZPw12gAj4VSzMFUdzVPfeI9HseLi/iDewOTWE1DV9V1xj9RK0Fv/kTgVXTaZZjaGGT1ya4mX8nuonYx/j4r3s9ATxhobn03yD78VZ2erWd5g28ySDuVNeTtZxltpiXaOnFBtWfT7vz7FmhZT0B9J+4quP8AISb2Wn4WOtHtpYMuRUOVWZsDOTWb8M6/NqUiwyYWTOMDoa2ccadQMt711cWVZI2jmZcTxypgrexWPDSklhz8Cp2eM1Hfg7NwVce/WilwOnSmiTrKMYPA+KC1tA6+pMADA96KWxUeWbJqGkA4CNFwowKBPMAPxEfahzT8cGq24uPn+tQyaC3MysCoyWPALH9qgzFVZAo9WOcHvUaWccnI44yRURrxE3EkKDxk0tsYkSnlbOCc03zPmozXC7dwPbOKb5uVBIwcc1CZNGh0OcOXgJ5/Ev71cEYrI6TciHUImOeTt/WtXvBNOi9C5KmFU4prvTGkAFDL5NXRA2RqEGorYxQsDNSQFQmihgKCCAK5mgCQWDClTFHFKgg8rudSWRiiLhF4yKrJb6PflmOB2NQLu5kiACHqc1Cdt6l5DgmvLQwJ7Z6zSLh9SCKSnIP9KpdQ1GZQTE+M9jQxN5HQbh81BuWaeXdjArXhwRT6EzZuP8Lbi6vteWNSoaKNpHLZxtHH717ZDtxhenvXj/8Ag5cxRpqkKQI1yWRmkP4vLweB+f8AevUrNyTxnHtXUwxUFo4nlNvJ/CTqEcT27b5Nn+oGgR+uFBvO0gcgdaDcyyTiQBVaJD196JiO1hCyAyMOce2T7U3szh55NvGe1QJ7lUGWI56c4od1K/rkj5JACg9OvWqi4UXEytPLhs7UCt1NDYJE6W43LlAQD3bpVXPKc80W6ndpiFx5YGeDn8hVZJKAMZPzmqtlkh7y7vSeBQ9kZKmTawXnk8io7zIBkmmecMAsQPyyaWy4djGGBJ564+fammTod5z3oJkbguAT+uKa20qSiuQRltvJUVHRJMtZM3cfJ4OeBWvSU4BPcZrG6fuM7yg8KhOR+lbIIDGueDtGarLK4dFlBSOmXmnB6AYznNPQjoabjzxkLliaCFielCaTaakLtxQ2g8w5rQmKGKzMalwoO9dihUDGKeV2iiwDqigUqr5Zyp60qkijwO8nXADdahGcMnJ6Vy54kOTk1D3djXHhjVHo5ZHZKEyM3J4rnnJyF61BZsE4pWcNxeXMdtaRtLNIcKqjrTv1oU8h6X/gxHM+sajthBh+nG+Qj8JzwM/PP6V6bdtdxxBVKCVjhQo/uaxOixnwT4bcyODczMN2Ort8fAFbDS9cttXWH6aRSGAVv9LY5BFPxzi1xvZzfIjLm51om2gnggjFwmCQS20ghcD3+aFcXcX4XkAd143e/UU7UZo7WMsA0oUcAniqXT7y2kvWaSPNu8Q8sEZII6nn9qZyp0Z6tWNvp9pYSAg46GqJrvZtHJKDAJOSa0+rvHe74oIOOzKOc/PtVHJ4dmktvMjkRpf/ABr1FQ2yVQCG9R7do34dOUwevvUCaUgnk0Jbi40y5YgbJF4O5elHuraTyopzJGwlQSKEOSAR3+ao3ZNEQTO0hGMLjrRUbnuajHIbkGigjgZH51FkkkMW65rgkfySNiggkcDGfamrKwfjCH2XiuvLiCTdRYEnwdHNNG81yQ6rzIeg46f71rrS6S4GVbNYrTLiSC2EETEIfxDPBNTPDt2Yb64tvUFV8AMc1kyN2vo144pp/ZtQM0x044oaTjHJoyuGFRVlXoj72Vsdqm28q4wajSYXmuKeM0yGWUNFJY1IsHYAZFRpJWNCEjdKazE1rh5EH2IlikgEzMWpUVlHeuVoTQs8BvoSjFsdaq5WKtzXs8/gezu0KqZrYe74bNR4vBvhrS5FkvMTyKc/xX3Z/wDUVy8bcV6jryyRfR5bpmh6pqzJ9JZytG5wJSuEH516d4d0Sw8IWfn3REt245YDlvgew+an3uvR7hFZQrEiD05GAB9qzeoag5lkmeTznIxz2pefyF7Y7CEZS70RPEury6hMZZzweEQHhB7Cq7Rru5XUA1rIwliXzFCnupzUe5lE+Wcc9u2KJ4SYRa2sjHK5AbPseDS4LVvs0SajGj1e/wBRivrKG4hbAdNxIwcHuKh2Wo29zpCw3bnz4GIzt5A/lPzUHRbJrbXTpczr9LJl493ckekj+1A13UrLQryeJVmw5w21M4/+xXQjPkub/hyZ4+MuK/pc3NxetHC1vHM4UHMkaYxUGPV/+ykt5xOheTejsoG0YxyR9v61odJu7K90OO4t2kkjkGPScYPfj3zWW13TLi2XzoCZI+coSdwHXj/aryvsUvohtDcG53tcK8StuMbHJI79e/Wq+8YecZLVnt5AchRUaLUT5jlHZskBg/DL+R6GpS3o5K7WfHDNg0suPtZbm6BE86MVOATgEn8qfyUB2ttJxkc0OK92IwkKPGT7Y2/pTPrSp3RSFwx9II4FFgWYlQqMqARwTUW6nV3+miX+Ju9TZ4UVX3F46l1Ub5GHQdqm6fblF3scsetVbvRKVbJemxlGKnn70Wcmz1WGcqQk64Ldtw/4otlESxB4IGc9qq77xDs1BtLMJJDAO7jgd+KpOK4DsTbno0Or6jJawCVOmKNoevpcqAW5rPeKtSij0nCkFsYrK6BqbRSLkkVn9XuNFRrie0STB485ols4K81mdP1DzoBznir21kHlAgUJ2xTjSLDC4ya4SnaoT3B6U6Ns85q3IrxDP1yBSp+RtpULLJdMjimVt9oDXUZa1u5omP8AKWJFZHUtL1Gxc+fCzAfzg8V6bAMKKM0aSrtkUMPmujl8WGQy4/JnA8Wn80j8BPwKgvayMcgEHsDXr1/4Ws7nLQjyn+OlZnUvDVzbZOzevutYpeG4dGyPl8jz64gcAiRRTdGt/LmmYdyOtaC8smAIcGoEcHlE44U9aXVKhnNs00E6yW9kwkLTQNujf2IOdp+KpvGt8tzdMfqPRLxJGycjjg5+K5ZX0lo58hlDZBw34WFD1eOC7meK4IDMNyZ6jPsaFOlRWk2mZjRNc1KGRbPTbiYSNIAsION5JxivTDJcWyxTXwLyMil4yc7TxkZrz7QbddA8TWOp3kT3dlbyFz5Iy44OOO/OD+VbmbxHpWu3E30NyN6+ry5IyrY+xFbI8atMz5U76LBItL1MbfQsndXxVRf6Lp9m5wq7mIyAevNBkg8rdLkBR6iyntWQ1rxVBPNBbWLb45cCWVfSUBx0J74/Sprl0hS18l21hJMSYpCICxwABj/mh3VmkcaRiSQEnPAJGB1qzF/YW4isbXY2yLcNvICjinoUuMPtZh/KV6CltF7ZGs7FI23ZyT3PerWGIqpcdP702SSK1iMjhd2PSvdvilZ3CSWaLIrKRywB/epSSItsmxSNKhjjG3jdmsFrLs+vzy9DwB+QraCZIi2X4+/WsdqqE37yL0NZsmbk6+DZgxqO/kgzi4vXCyElB2pPCsC7gMEVb2MSsmSOcUO/tPNQ7a1RinATKTUyw8O35dQoNbqynPlAFhXk+mSPZ3IVsgZrf6VdxtGOSTisUlxZo9yNDuRj15o8ZVep4HWoMDrwdn9KzfjjxKNKtWit8ea4wKiO3RFHfG3jqLTFNrZENPjHHau14zcyyXEzSzMWdjkk0q3R8eFeoW8jWkfWMHKCjio0DrkFT6H5H3qRW45YQHFI4YYYAimjpTWPFBJWanotpeAnaFb3Feb63ZpaXssIOQpFenXUrAELXm+vpINQmdurGsHlJLa7NeBvooWO44KjHIYH9qBvUKFDbnjPSTsPvU2RFkXDAZPahSR8g5BxwQwrFZqsj7Qsm9A4D9dpyKY8KO+2eMOezbMH9aeYBGSNvoY9VaukY9Ei+nsc5othZCl0y2lISRJlUdAJjj8hmp2j+FbRpTKLcGNO7PnJ+K6ARgYDjoAvWr6wt3hs9spI3HIA7U7FKUnTehObJGCsZ9N5bB1gxg8q2OasFvrWCFS6cDgKFpsMZlwm5sdhVXMxlupYWKr5Zwo6Zp/XQlNSFHC13ePIqsELEgMckVOwkMErDJRUOSO9ctwoUr5yqP5sdaptX11RG9taIducF+xHxUNUiy2yPJcuzhmYk1Fu5GLg461Ca/IP4a5/1AP6SvNY/wBUl8G9ZIl3pykrVikAYeqg6LFviDEdqszFtrowVRSMM5XJszmrWyxguowRVj4dvy21VXmm6jAZAR2ql0+4OmaioY+gmk5cdqxuOfwejTXUtvatK4wAK8a8S6nJqWpSSOfSDgCvSNe1Ito7bW4Za8jmyZnz1zS/GiuTf0On7QZNKiqmR0pVu5ITxZ9OSs9i2CC1ux7dVqfa3iSqBuGex96LPAHUgrkHqKz19Yz2zF7Qnb1K+1MbaOa9GnzxTT0rM2niKS3Pl3sTFR/MKurTVLO7H8GdCf8AKTg0ckwTTDPGCCTWE8TRLJI7qcMpr0FwPJZge1eeazMPqGyM7sisXmOkjZ4/bMxKgDHHUcinBldc/qKPNbTuqsFC84BJqN9BMzEBs567awrZpbS7Yx5oYQSWUqewHShL5t0VW1TIbuRVtZ6Gg9UmEB69zVvB9NYpiBFU/wCduTTY4W+zLk8qEfbtkTTdEjsk865H8Q8he9K4m3ybV5+1PuLmSdtse7nqe5o1nbKmGPLf2rTGNKkZFGU5c5kmwg8tMt+Iis5qdo0lxIdvU1rohtFOigt5idyimOFofGVHnjWDKThTQpbMgcjFennSLaQekCqjWNCCRFkqHBpWMU7Z53LZDtXYLBdwJFWs+k3Af05NSrTS5wAZFx96VF2NeibpieXCFAqbJGygFuhptvGLfG4jOKjSSSlnZnBXsKrPyeLSiTHDe2dnh3rwKzes6eSCw6iryO+wOcVGvZRIpwKdDLGZSUHEpLW7NxbG1mPqXjmq2XSlWQs3epF4jRyeYnBFFt71Zl2ODupUscou4jY5NUyAtlFF6yMgUquorYSjBXg0qmONteorLLvR9ABveg3ESupYcNXaVbzCUVxawXBO5MN7iqu70dUG8FT/AENKlVGk0VcURVMiDYtzcoPZZMigNZwFtzSSk+5pUqU0n2UtroRgth1V2x7mmtIicRQovyeaVKjil0R29gpBI3LPx7CuJbbuS3FKlUVsdGKSsOkKoMKMVJiWu0quiSQo9JoCTeW54pUqlkxJ0NwT0yKbqcx+mbPPFKlVZuosZFepEDR1jlGZFyaHrEql/LjXaBSpVim2sKNKX+hSzKTIDvPFR5I+WO4/alSrIkh9lc8Ozd6jk02NiBgnNKlVk6LPaB3EAkFCg09FfIpUq6mN3FNmHIqlSLaCDAGDSpUquKs//9k=`,
      desc: "It is delicious product made with milk and palm sugar decorated with cashews and almonds",
    },
    {
      name: "Dal Makhni",
      Price: 12.99,
      img: `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QCLRXhpZgAASUkqAAgAAAAEAA4BAgA1AAAAPgAAABIBAwABAAAAAQAAABoBBQABAAAAcwAAABsBBQABAAAAewAAAAAAAABWZWdhbiwgQ29jb251dCBNaWxrIFZhbmlsbGEgSWNlIENyZWFtIEluIGEgU3VnYXIgQ29uZSwBAAABAAAALAEAAAEAAAD/7QB6UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAF4cAlAADkxhdXJpUGF0dGVyc29uHAJ4ADVWZWdhbiwgQ29jb251dCBNaWxrIFZhbmlsbGEgSWNlIENyZWFtIEluIGEgU3VnYXIgQ29uZRwCbgAMR2V0dHkgSW1hZ2Vz/+EFMmh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+Cgk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6SXB0YzR4bXBDb3JlPSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wQ29yZS8xLjAveG1sbnMvIiAgIHhtbG5zOkdldHR5SW1hZ2VzR0lGVD0iaHR0cDovL3htcC5nZXR0eWltYWdlcy5jb20vZ2lmdC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBsdXM9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iICB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIiB4bWxuczp4bXBSaWdodHM9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9yaWdodHMvIiBwaG90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`,
      desc: "It is delicious product made with milk and palm sugar decorated with cashews and almonds",
    },
  ]);
  const [Subtotal, setSubtotal] = React.useState(42.97);
  const [open, setOpen] = React.useState(false);
  const [tip, setTip] = React.useState((0.0).toFixed(2));

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let navigate = useNavigate();
  console.log("Tip", tip);
  return (
    <div style={{ margin: "5%" }}>
      <div style={{ margin: "5%", fontFamily: "Arial, sans-serif" }}>
        <div className="row" style={{ marginBottom: "20px" }}>
          <div
            className="col-md-4"
            style={{
              fontSize: "18px",
              padding: "15px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" style={{ marginBottom: "15px" }}>
              Order Summary
            </Typography>
            <table style={{ width: "100%" }}>
              <tr>
                <td style={{ padding: "10px" }}>Subtotal:</td>
                <td style={{ padding: "10px", fontWeight: "bold" }}>
                  ${Subtotal}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px" }}>Taxes:</td>
                <td style={{ padding: "10px", fontWeight: "bold" }}>
                  ${(0.07 * Subtotal).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px" }}>Tip:</td>
                <td style={{ padding: "10px", fontWeight: "bold" }}>
                  <a
                    href="#"
                    style={{
                      fontSize: "16px",
                      color: "seagreen",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                    onClick={handleClickOpen}
                  >
                    Set Tip
                  </a>
                </td>
              </tr>
              <tr style={{ borderTop: "2px solid #ddd" }}>
                <td style={{ padding: "10px" }}>Total:</td>
                <td
                  style={{
                    padding: "10px",
                    fontWeight: "bold",
                    color: redcolor,
                  }}
                >
                  ${(Subtotal + 0.07 * Subtotal).toFixed(2)}
                </td>
              </tr>
            </table>
          </div>
          <div
            className="col-md-4"
            style={{
              padding: "15px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="body1"
              style={{
                marginBottom: "10px",
                fontWeight: "bold",
                color: redcolor,
              }}
            >
              Special Instructions
            </Typography>
            <TextField
              id="special-instructions"
              label="Enter Special Instructions"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              style={{ marginBottom: "20px" }}
            />
          </div>
          <div
            className="col-md-4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "15px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/Checkout")}
              fullWidth
              style={{
                fontSize: "18px",
                padding: "12px",
                borderRadius: "8px",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
                backgroundColor: redcolor,
              }}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>

      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          sx={{
            maxWidth: "400px", // Set max width if needed
            minWidth: "250px", // Set a minimum width for responsiveness
            height: "auto", // Optional: control height
          }}
        >
          <DialogTitle
            id="customized-dialog-title"
            sx={{
              m: 0,
              paddingBottom: 0, // Reduce bottom padding if there's unnecessary space
              paddingTop: 0, // Ensure there’s no top padding
              //textAlign: "center"
            }}
          >
            <Typography
              variant="body1"
              sx={{ marginBottom: 1, fontSize: "16px", color: redcolor }}
            >
              Please Select/Enter a Tip
            </Typography>
            {/* Tip Amount TextField */}
            <TextField
              id="top-textfield"
              variant="standard"
              type="number"
              // Value={tip}
              value={tip}
              //  onChange={(e) => setTip(e.target.value)}
              InputProps={{
                disableUnderline: true, // Removes the underline
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: redcolor }}>
                    $
                  </InputAdornment>
                ),
              }}
              sx={{
                fontSize: "20px", // Larger font for better readability
                //  textAlign: "center",
                width: 150, // Fixed width to keep it consistent

                marginBottom: 0,
                "& .MuiInputBase-input": {
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: redcolor, // Text color inside the input field
                },
              }}
            />
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 10,
              top: 16,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent dividers sx={{ paddingTop: 0, paddingBottom: 0 }}>
            <ButtonGroup
              variant="outlined"
              style={{ borderColor: redcolor }}
              aria-label="tip button group"
            >
              <StyledButton
                onClick={() => {
                  setTip((0.1 * Subtotal).toFixed(2));
                }}
                sx={{ color: redcolor, borderColor: redcolor }}
              >
                10%
              </StyledButton>
              <StyledButton
                onClick={() => {
                  setTip((0.15 * Subtotal).toFixed(2));
                }}
                sx={{ color: redcolor, borderColor: redcolor }}
              >
                15%
              </StyledButton>
              <StyledButton
                onClick={() => {
                  setTip((0.2 * Subtotal).toFixed(2));
                }}
                sx={{ color: redcolor, borderColor: redcolor }}
              >
                20%
              </StyledButton>
              <StyledButton
                onClick={() => {
                  setTip((0.25 * Subtotal).toFixed(2));
                }}
                sx={{ color: redcolor, borderColor: redcolor }}
              >
                25%
              </StyledButton>
            </ButtonGroup>

            <ButtonGroup variant="outlined" aria-label="tip method group">
              <StyledButton
                onClick={() => {
                  setTip("you'll pay with cash");
                }}
                sx={{ color: redcolor, borderColor: redcolor }}
              >
                Cash
              </StyledButton>
              <StyledButton
                onClick={() => {
                  setTip((0.0).toFixed(2));
                }}
                sx={{ color: redcolor, borderColor: redcolor }}
              >
                No Tip
              </StyledButton>
              <StyledButton
                onClick={() => {
                  setTip("");
                }}
                sx={{ color: redcolor, borderColor: redcolor }}
              >
                Custom
              </StyledButton>
            </ButtonGroup>
          </DialogContent>

          <DialogActions
            sx={{ marginTop: 0, color: redcolor, borderColor: redcolor }}
          >
            <Button
              onClick={handleClose}
              variant="contained"
              style={{ backgroundColor: redcolor, color: "#ffffff" }}
            >
              Save Tip
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {cart.map((data) => {
          console.log("data---", data);
          return (
            <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar variant="rounded" src={data.img} />
                </ListItemAvatar>
                <ListItemText
                  primary={data.name}
                  secondary={
                    <div className="row">
                      <div className="col-md-9">
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          -${data.Price}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          {data.desc}
                        </Typography>
                      </div>
                      <div
                        className="col-md-3"
                        style={{
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        {<AddBtn data={data} />}
                      </div>
                    </div>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          );
        })}
      </List>
    </div>
  );
}

function AddBtn({ data }) {
  const [count, setCount] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [detail, setDetail] = React.useState({});
  const [isHovered, setIsHovered] = React.useState(false);
  console.log("data", data);
  return (
    <>
      {" "}
      <div
        class="btn-group"
        role="group"
        aria-label="Button group with nested dropdown"
        style={{ display: "inline-flex" }}
      >
        <button
          type="button"
          class="btn btn-warning"
          style={{
            border: "none",
            backgroundColor: isHovered ? redcolor : "#f57c00",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            if (count > 0) {
              setCount(count - 1);
              setTotal(total - 1);
              <Cart data={data} />;
            }
          }}
        >
          -
        </button>
        <button
          type="button"
          class="btn btn-warning"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            border: "none",
            backgroundColor: isHovered ? redcolor : "#f57c00",
          }}
        >
          {count == 0 ? "ADD" : count}
        </button>

        <button
          type="button"
          class="btn btn-warning"
          style={{
            border: "none",
            backgroundColor: isHovered ? redcolor : "#f57c00",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            setCount(count + 1);
            setTotal(total + 1);
            setDetail(data);
            console.log(detail);
          }}
        >
          +
        </button>
      </div>
    </>
  );
}

export default Cart;
