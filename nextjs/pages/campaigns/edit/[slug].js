import axios from "axios";
import { API_URL } from "src/config";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import MaterialUIDrawer from "src/components/MaterialUIDrawer";

export default function Slug() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Box>
      <MaterialUIDrawer url={slug} />
    </Box>
  );
}

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { slug: "basics" } },
//       { params: { slug: "content" } },
//       { params: { slug: "perks" } },
//     ],
//     fallback: true, // false or 'blocking'
//   };
// }

// export const getStaticProps = async () => {
//   try {
//     // Set Loading to true

//     // Make axios get request to category
//     const response = await axios.get(`${API_URL}/categories`);
//     // Set Loading to false

//     return {
//       props: {
//         categories: response.data.data,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         categories: [],
//       },
//     };
//   }
// };
