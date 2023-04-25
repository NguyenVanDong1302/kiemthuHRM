import { useLocalization } from "hooks/useLocalization";
import React from "react";
import { Container } from "rsuite";

const Page404 = () => {
  const _t = useLocalization("Page404");
  React.useEffect(() => {
    document.title = _t("Page not found...");

    return () => {
      document.title = _t("test");
    };
  }, []);

  return (
    <Container>
      <center>
        <img src="/img/404.jpg" />
      </center>
    </Container>
  );
};

export default Page404;
