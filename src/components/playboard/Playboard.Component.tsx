import "./Playboard.css";
import boyImg from "./../../assets/boy.jpeg";
import oyterImg from "./../../assets/oyster.avif";
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import MintOyster from './MintOyster'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function PlayboardComponent() {
  const [elementPosition, setElementPosition,] = useState(50)
  let [tooltipIsOpen1, setTooltipIsOpen1] = React.useState(false);
  let [tooltipIsOpen2, setTooltipIsOpen2] = React.useState(false);
  let [tooltipIsOpen3, setTooltipIsOpen3] = React.useState(false);
  let [digest, setdigest] = React.useState('');
  let isOyster1Open = false, isOyster2Open = false, isOyster3Open = false;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  let mintResponse: any = {}
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function closeTooltip() {
    setTooltipIsOpen1(false);
    setTooltipIsOpen2(false);
    setTooltipIsOpen3(false);
    isOyster1Open = false
    isOyster2Open = false
    isOyster3Open = false
  }
  const oyster = new MintOyster()
  async function mintOyster(isSTatic: boolean) {
    const nftContractAddr = oyster.nftContractAddr
    mintResponse = await oyster.handleSignAndExecuteTransaction(nftContractAddr, {
      isCustomExecution: true,
      isSendStatic: isSTatic
    })
    setdigest(mintResponse.digest)
    closeTooltip()
    setOpen(true)
  }
  let objImage: any = null;
  let moveImgLeft: number = 0
  let moveImgRight: number = 0
  let moveImgTop: number = 0
  let moveImgDown: number = 0
  function handleEsc(event: any) {
    if (event.keyCode === 27) {
      close();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', getKeyAndMove);
    return () => {
      document.removeEventListener('keydown', getKeyAndMove);
    }
  }, []);

  function isOverlapping(element1: any, element2: any) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(
      rect1.right < rect2.left ||    // Element 1 is left of Element 2 
      rect1.left > rect2.right ||     // Element 1 is right of Element 2 
      rect1.bottom < rect2.top ||     // Element 1 is above Element 2 
      rect1.top > rect2.bottom         // Element 1 is below Element 2 
    );
  }


  function getKeyAndMove(e: any) {
    var key_code = e.which || e.keyCode;
    switch (key_code) {
      case 37: //left arrow key
        moveLeft();
        break;
      case 38: //Up arrow key
        moveUp();
        break;
      case 39: //right arrow key
        moveRight();
        break;
      case 40: //down arrow key
        moveDown();
        break;
    }
  }
  function moveLeft() {
    setElementPosition((elementPosition) => elementPosition - 20)
    let object = document.getElementById("object");
    let oyster1 = document.getElementById("oyster1");
    let oyster2 = document.getElementById("oyster2");
    let oyster3 = document.getElementById("oyster3");
    if (isOverlapping(oyster1, object) && !isOyster1Open) {
      setTooltipIsOpen1(true)
      isOyster1Open = true
      console.log('oyster1 in')
    } else if (isOverlapping(oyster2, object) && !isOyster2Open) {
      isOyster2Open = true
      setTooltipIsOpen2(true)
      console.log('oyster2 in')
    } else if (isOverlapping(oyster3, object) && !isOyster3Open) {
      setTooltipIsOpen3(true)
      isOyster3Open = true
      console.log('oyster3 in')
    }
    else {
      closeTooltip()
    }
  }
  function moveUp() {
    moveImgTop = moveImgTop - 5;
  }
  function moveRight() {
    setElementPosition((elementPosition) => elementPosition + 20)


    let object = document.getElementById("object");
    let oyster1 = document.getElementById("oyster1");
    let oyster2 = document.getElementById("oyster2");
    let oyster3 = document.getElementById("oyster3");
    if (isOverlapping(oyster1, object) && !isOyster1Open) {
      setTooltipIsOpen1(true)
      isOyster1Open = true
      console.log('oyster1 in')
    } else if (isOverlapping(oyster2, object) && !isOyster2Open) {
      isOyster2Open = true
      setTooltipIsOpen2(true)
      console.log('oyster2 in')
    } else if (isOverlapping(oyster3, object) && !isOyster3Open) {
      setTooltipIsOpen3(true)
      isOyster3Open = true
      console.log('oyster3 in')
    }
    else {
      closeTooltip()
    }
  }
  function moveDown() {
    moveImgTop = moveImgTop + 5;
  }

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip disableFocusListener={true}  {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',

    },
  }));

  return <>

    <div className="main-div">
      <HtmlTooltip
        open={tooltipIsOpen1}
        onOpen={() => setTooltipIsOpen1(true)}
        onClose={() => setTooltipIsOpen1(false)}
        title={
          <React.Fragment>
            <Typography color="inherit"><small>Accept Oyeter or move to next</small></Typography>
            <br />

            <em><Button variant="contained" onClick={() => mintOyster(false)}>Accept</Button></em>  <u><Button onClick={closeTooltip} variant="outlined">Next</Button></u>
            <br />
          </React.Fragment>
        } disableHoverListener={true}
      >
        <img id="oyster1" onKeyDown={getKeyAndMove} src={oyterImg} alt="home_p" height={50} />
      </HtmlTooltip>



      <img id="object" onKeyDown={getKeyAndMove} style={{
        left: `${elementPosition}px`,
        right: `${elementPosition}px`,
        position: 'relative'
      }} src={boyImg} alt="home_p" height={100} />
      <HtmlTooltip
        open={tooltipIsOpen2}
        onOpen={() => setTooltipIsOpen2(true)}
        onClose={() => setTooltipIsOpen2(false)}
        title={
          <React.Fragment>
            <Typography color="inherit"><small>Accept Oyeter or move to next</small></Typography>
            <br />

            <em><Button variant="contained" onClick={() => mintOyster(true)}>Accept</Button></em>  <u><Button onClick={closeTooltip} variant="outlined">Next</Button></u>
            <br />
          </React.Fragment>
        } disableHoverListener={true}
      >
        <img id="oyster2" onKeyDown={getKeyAndMove} src={oyterImg} alt="home_p" height={50} />
      </HtmlTooltip>
      <div>
        <HtmlTooltip open={tooltipIsOpen3}
          onOpen={() => setTooltipIsOpen3(true)}
          onClose={() => setTooltipIsOpen3(false)}
          title={
            <React.Fragment>
              <Typography color="inherit"><small>Accept Oyeter or move to next</small></Typography>
              <br />

              <em><Button variant="contained" onClick={() => mintOyster(true)}>Accept</Button></em>  <u><Button onClick={closeTooltip} variant="outlined">Next</Button></u>
              <br />
            </React.Fragment>
          } disableHoverListener={true}
        >
          <img id="oyster3" onKeyDown={getKeyAndMove} src={oyterImg} alt="home_p" height={50} />
        </HtmlTooltip>
      </div>

    </div>
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"NFT minted successfully"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           <p>digestId: {digest && digest}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
            Disagree
          </Button> */}
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  </>
}

export default PlayboardComponent;