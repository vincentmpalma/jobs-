import 'dotenv/config';
import express from 'express'
import cors from 'cors'
const app = express();

// only allow requests from the local vite dev server
const corsOptions = {
  origin: ["http://localhost:5173"]
}

app.use(cors(corsOptions))

// quick health check route
app.get('/', (req, res) => {
  res.send("working!")
})

// main jobs endpoint — fetches from arbeitnow and usajobs, merges results
app.get('/jobs', async (req, res)=>{
  const title = req.query.title;
  // console.log(title)

  const arebeitnowURL = `https://www.arbeitnow.com/api/job-board-api`
  const usaJobsURL = `https://data.usajobs.gov/api/Search?PositionTitle=${title}`
  try{

    const arebeitnowURes = await fetch(arebeitnowURL)
    if (!arebeitnowURes.ok) {
      throw new Error('Failed to fetch Arbeitnow API');
    }

    const arebeitnowData = await arebeitnowURes.json()
    let data = arebeitnowData.data

    // arbeitnow returns everything, so filter by title on our end
    if (title) {
      data = data.filter(job =>
        job.title.toLowerCase().includes(title.toLowerCase())
      );
    }
    // console.log(data)

    // console.log('USER_AGENT_EMAIL being sent:', process.env.USER_AGENT_EMAIL);
    // console.log('USA_JOBS_API_KEY length:', process.env.USA_JOBS_API_KEY?.length);

    // usajobs requires these specific headers or it rejects the request
    const usaJobsRes = await fetch(usaJobsURL, {
      method: 'GET',
      headers: {
        'Host': 'data.usajobs.gov',
        'User-Agent': process.env.USER_AGENT_EMAIL,
        'Authorization-Key': process.env.USA_JOBS_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    const usaJobData = await usaJobsRes.json();

    // normalize usajobs response shape to match the arbeitnow shape
    const usaJobs = (usaJobData?.SearchResult?.SearchResultItems ?? []).map(item => {
      const d = item.MatchedObjectDescriptor;
      return {
        slug: item.MatchedObjectId,
        title: d.PositionTitle,
        company_name: d.OrganizationName,
        location: d.PositionLocation?.[0]?.LocationName ?? '',
        description: d.QualificationSummary ?? '',
        url: d.ApplyURI?.[0] ?? d.PositionURI ?? ''
      };
    });

    // combine both sources and send back as one list
    res.status(200).json({ data: [...data, ...usaJobs] })

  } catch (e){
    res.status(500).json({message: `Error code 500 - something went wrong: ${e}`})
  }

})

app.listen(8080, ()=>{
  console.log("Server started on port 8080")
})
