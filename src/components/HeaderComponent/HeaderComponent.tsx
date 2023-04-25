import { Icon } from "@rsuite/icons";
import { MoreInterface } from "components/interface";
import PermissionContainer from "components/PermissionContainer";
import { useLocalization } from "hooks/useLocalization";
import { memo } from "react";
import { BsPlusCircle, BsSearch } from "react-icons/bs";
import {
  Button,
  Col,
  Divider,
  Grid,
  Header,
  Input,
  InputGroup,
  Row,
  Stack,
} from "rsuite";
import MoreComponent from "./MoreComponent";
import { HeaderContainer } from "./styled";

interface Props {
  keyword: string;
  setKeyword: any;
  listMore?: MoreInterface[];
  title?: string;
  reloading: Function;
  handleAdd?: any;
  onlyShowTitle?: boolean;
  customComponent?: any;
  permission?: string;
  buttonContent?: string;
  link?: string;
  hideButton?: boolean;
  customTitleButtonAdd?: any;
}

function HeaderComponent(props: Props) {
  const _l = useLocalization("HeaderComponent");
  const _b = useLocalization("Button");

  return (
    <HeaderContainer>
      <Header
        className="page-header"
        style={{ width: "100%", padding: "5px 10px" }}
      >
        <Grid fluid>
          <Row className="d-flex align-items-center">
            <Col md={8}>
              {props.title && (
                <span className="page-title">{_l(`${props.title}`)}</span>
              )}
            </Col>
            {props.onlyShowTitle ? (
              <></>
            ) : (
              <Col md={8}>
                <Stack spacing={5}>
                  <InputGroup inside style={{ width: "300px" }} size="sm">
                    <InputGroup.Button>
                      <Icon as={BsSearch}></Icon>
                    </InputGroup.Button>
                    <Input
                      placeholder={_l("Search...")}
                      value={props.keyword}
                      onChange={(value: any) => {
                        props.setKeyword(value);
                        props.reloading();
                      }}
                    />
                  </InputGroup>
                  {props.hideButton ? (
                    <></>
                  ) : (
                    <PermissionContainer
                      permission={`${
                        props?.permission ? props.permission : ""
                      }`}
                    >
                      <Button
                        color="green"
                        size="sm"
                        appearance="primary"
                        onClick={props.handleAdd}
                        className="header-button"
                      >
                        <Icon as={BsPlusCircle} className="mr-1" />
                        <span>
                          {_l(
                            `${
                              props?.buttonContent
                                ? props?.buttonContent
                                : "Add new"
                            }`
                          )}
                        </span>
                      </Button>
                    </PermissionContainer>
                  )}

                  {props.listMore && (
                    <MoreComponent listButton={props.listMore} />
                  )}
                </Stack>
              </Col>
            )}

            <Col md={props.customComponent ? 16 : 8}>
              {props.customComponent && props.customComponent}
            </Col>
          </Row>
        </Grid>
      </Header>
      <Divider className="divider" />
    </HeaderContainer>
  );
}

export default memo(HeaderComponent);
