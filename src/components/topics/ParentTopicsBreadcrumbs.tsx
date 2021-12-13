import React from "react"
import {Skeleton, Stack, Text } from '@chakra-ui/react'
import gql from "graphql-tag"
import { TopicLinkData } from "../../graphql/topics/topics.fragments"
import { ParentTopicsBreadcrumbsDataFragment } from "./ParentTopicsBreadcrumbs.generated"
import { TopicLink } from "../lib/links/TopicLink"

export const ParentTopicsBreadcrumbsData = gql`
fragment ParentTopicsBreadcrumbsData on Topic {
    ...TopicLinkData
    parentTopic {
        ...TopicLinkData
        parentTopic {
            ...TopicLinkData
        }
    }
}
${TopicLinkData}
`
export const ParentTopicsBreadcrumbs: React.FC<{topic: ParentTopicsBreadcrumbsDataFragment; isLoading?: boolean}> = ({topic, isLoading}) => {
    return <Skeleton isLoaded={!isLoading}><Stack direction="row">
        {topic.parentTopic?.parentTopic && <TopicLink topic={topic.parentTopic.parentTopic}/>}
        {topic.parentTopic?.parentTopic && <Text>/</Text>}
        {topic.parentTopic && <TopicLink topic={topic.parentTopic} />}
    </Stack></Skeleton>
}