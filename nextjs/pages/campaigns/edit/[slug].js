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
