import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import { Box, Typography } from "@mui/material";
import { OutlineCard } from "./Card";
import useSWR from "swr";
import { Post } from "../types/post";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

//fetcherの定義
const url = "http://localhost:8000/post/all";
const fetcher = () =>
  fetch(url, {
    credentials: "include",
  }).then((res) => res.json());

export default function IconLabelTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //swr
  const { data, error } = useSWR(url, fetcher);

  //エラーやローディング中の処理
  if (error) return <div>Error : {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
        centered
      >
        <Tab
          icon={<SentimentVerySatisfiedIcon sx={{ color: "coral" }} />}
          label="Happy"
        />
        <Tab
          icon={<SentimentVeryDissatisfiedIcon sx={{ color: "red" }} />}
          label="Angry"
        />
        <Tab
          icon={<SentimentDissatisfiedIcon sx={{ color: "blue" }} />}
          label="Sad"
        />
        <Tab
          icon={<SentimentSatisfiedAltIcon sx={{ color: "gold" }} />}
          label="Funny"
        />
        <Tab
          icon={<SentimentNeutralIcon sx={{ color: "black" }} />}
          label="Emotionless"
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        {data.map((postData: Post) => {
          if (postData.emotionId === 1) {
            return <OutlineCard postData={postData} />;
          }
        })}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {data.map((postData: Post) => {
          if (postData.emotionId === 2) {
            return <OutlineCard postData={postData} />;
          }
        })}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {data.map((postData: Post) => {
          if (postData.emotionId === 3) {
            return <OutlineCard postData={postData} />;
          }
        })}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {data.map((postData: Post) => {
          if (postData.emotionId === 4) {
            return <OutlineCard postData={postData} />;
          }
        })}
      </TabPanel>
      <TabPanel value={value} index={4}>
        {data.map((postData: Post) => {
          if (postData.emotionId === 5) {
            return <OutlineCard postData={postData} />;
          }
        })}
      </TabPanel>
    </Box>
  );
}
