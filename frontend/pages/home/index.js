import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Carousel from 'react-bootstrap/Carousel'
import Navbar from '../../components/navbar/Navabar_road'
import {baseUrl} from "../../redux/api/index"
import { allService } from "../../redux/actions/service";
import { useRouter } from "next/router";
import { AllStylist } from "../../redux/actions/stylist";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));


export default function HomeNew(){
  const router = useRouter();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(allService());
    dispatch(AllStylist());
  },[])

  const allServices = useSelector(state => state.service?.AllData?.services);
  const allStylists = useSelector((state) => state.stylist?.AllData?.stylists);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

    return(
       <div>
         <div className="main-showcase">
           <div className="main-showcase-content">
           <Navbar />
           <div className="d-flex py-5 justify-content-center align-items-start flex-column text-white px-4">
             <span className="heading-1 font-demi">Beauty demands at doorstep</span>
             <span className="heading-2 font-regular">Book your mobile hair and beauty service <br></br>from top-stylists around the city today -</span>
             <Link href={'/serviceLocation'}>
               <a>
              <button className="btn btn-dark heading-button">Book Now</button>
               </a>
             </Link>
           </div>
           </div>
         </div>
         <div className="row main-showcase-2 bg-customColor custom-padding-company align-items-center py-4">
             <div className="col-lg-4 custom-padding-showcase-2 py-3 col-md-4 col-sm-12 col-12 custom-margin h-250">
             <i class="fas fa-clock fa-4x mb-4 icon-color"></i>
             <p className="h4">24 hr availability</p>
             <p className="h6">Arouond the clock booking availabiility</p>
             </div>
             <div className="col-lg-4 custom-padding-showcase-2 py-3 col-md-4 col-sm-12 col-12 custom-margin h-250">
             <i class="fas fa-dollar-sign fa-4x mb-4 icon-color"></i>
             <p className="h4">Affordable prices</p>
             <p className="h6">Enjoy affordable mobile services from top stylists</p>
             </div>
             <div className="col-lg-4 py-3 custom-padding-showcase-2 col-md-4 col-sm-12 col-12 custom-margin h-250">
             <i class="fas fa-map-marked-alt fa-4x mb-4 icon-color"></i>
             <p className="h4">Anywhere, Anytime</p>
             <p className="h6">Choose you preffered location and time slot as per your flexibility</p>
             </div>
           </div>
           <div className="pb-5">
             <div className="font-56 py-4 text-center">
                Popular Services 
             </div>
             <div className="row py-5">
             {allServices && allServices.length>0 ? (
                        allServices.map(val => {
                            return (
                            <div className="col-lg-3 col-md-6 col-sm-12 col-12 px-5 py-3">
                              <Link href={'/serviceLocation?id=' + val._id}>
                                <a>
                                <div className="popular-service-card d-flex flex-column justify-content-center align-items-center px-3 py-3">
                                  <img src={baseUrl + val.icon}  width={95} height={75}></img>
                                  <p className="mt-2 h5 text-dark">{val.name}</p>
                                </div>
                                </a>
                              </Link> 
                            </div>
                            )
                        })
                    ) : (
                        ''
                    )}
                  {allServices && allServices.length>0 ?
                    (
                      <div className="col-lg-3 col-md-6 col-sm-12 col-12 px-5 py-3">
                      <Link href={'/serviceLocation'}>
                       <a>
                         <div className="popular-service-card d-flex flex-column justify-content-center align-items-center px-3 py-3">
                         <p className="mt-2 h4 text-dark">MORE...</p>
                       </div>
                       </a>
                     </Link> 
                     </div>
                    ) : ( " " )
                  }
             </div>
          </div>
           <div className="bg-customColor pb-5">
           <div className="font-56 py-4 text-center">
           Expert Stylists
          </div>
          <div className="row custom-padding-company align-items-center">
            {allStylists && allStylists.length>0 ? 
                allStylists.map((val,i)=>{
                return (
                  <div className="col-lg-4 py-3 col-md-4 col-sm-12 col-12 custom-margin">
                    <img className="stylist-image" src={baseUrl + val.img}  width={240} height={250}></img>
                    <p className="mt-3 h4">{val.fullName}</p>
                    <p className="experience-color h6">{val.experience}</p>
                  </div>
                )
            }): ''}
           </div>
          </div>
          <div className="d-flex">
            <div className="col-lg-4 h-322 carousel-left-item col-md-4 col-sm-12 col-12 width-carousel-left-item">
            <Image
                  src="/images/Group_11.svg"
                  alt="logo"
                  className="img-fluid-custom"
                  layout="fill"
                />
            </div>
            <div className="width-carousel-right-item my__carousel_main">
            <Carousel controls={false} className="custom-carousel">
              <Carousel.Item interval={3000}>
                <div className="d-flex flex-column">
                 <span className="carousel-heading-1 font-bold icon-color pb-3">What People Say</span>
                 <span className="carousel-heading-2 pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
                 <p className="pb-4">
                   <span className="icon-color">John Deo</span>
                   , Student
                  </p>
                </div>
              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <div className="d-flex flex-column">
                 <span className="carousel-heading-1 font-bold icon-color pb-3">What People Say</span>
                 <span className="carousel-heading-2 pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
                 <p className="pb-4">
                   <span className="icon-color">John Deo</span>
                   , Student
                  </p>
                </div>
              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <div className="d-flex flex-column">
                 <span className="carousel-heading-1 font-bold icon-color pb-3">What People Say</span>
                 <span className="carousel-heading-2 pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
                 <p className="pb-4">
                   <span className="icon-color">John Deo</span>
                   , Student
                  </p>
                </div>
              </Carousel.Item>   
           </Carousel>
            </div>
          </div>
          <div className="bg-customColor px-lg-5 px-2 pb-5">
          <div className="font-56 pb-3 pt-4 text-center">
           FAQ’s
          </div>
          <div className={classes.root}>
           <Accordion className="bg-customColor-Accordion"  expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
         >
          <Typography className={classes.heading}>General settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
            maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="bg-customColor-Accordion" expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Users</Typography>
          <Typography className={classes.secondaryHeading}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
            diam eros in elit. Pellentesque convallis laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="bg-customColor-Accordion" expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Advanced settings</Typography>
          <Typography className={classes.secondaryHeading}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="bg-customColor-Accordion" expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Personal data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
           </div>
          </div>
         <div className="pb-5">
           <div className="font-56 pb-3 pt-4 text-center">
            Supported By
          </div>
          <div className="row custom-padding-company align-items-center">
             <div className="col-lg-4 py-3 col-md-4 col-sm-12 col-12 custom-margin">
              <Image src="/images/img_uni.png"  width={200} height={100}></Image>
             </div>
             <div className="col-lg-4 py-3 col-md-4 col-sm-12 col-12 custom-margin">
              <Image src="/images/volta.png"  width={240} height={100}></Image>
             </div>
             <div className="col-lg-4 py-3 col-md-4 col-sm-12 col-12 custom-margin">
              <Image src="/images/innova.png"  width={200} height={100}></Image>
             </div>
           </div>
        </div>
        
       </div>
    )
}